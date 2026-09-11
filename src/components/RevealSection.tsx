"use client";

import { useLayoutEffect, useRef, type HTMLAttributes } from "react";
import { usePathname } from "next/navigation";

type RevealSectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "footer" | "nav" | "div";
};

const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Content stays readable on the server and when animation is unavailable. */
export function RevealSection({ as: Tag = "section", children, ...props }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    // Keep cards, forms and sliders intact; never animate a nested section twice.
    const collect = (parent: Element): HTMLElement[] =>
      Array.from(parent.children).flatMap(child => {
        if (!(child instanceof HTMLElement) || child.hasAttribute("data-reveal-section")) return [];
        if (getComputedStyle(child).position === "absolute" && !child.hasAttribute("data-reveal")) return [];
        if (child.matches(".container, .grid, [data-reveal-group]")) return collect(child);
        return [child];
      });

    const pending = new Map<HTMLElement, Animation[]>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry, index) => {
        const target = entry.target as HTMLElement;
        pending.get(target)?.forEach(animation => {
          // Stagger only items entering together, not all preceding siblings.
          const timing = animation.effect?.getTiming();
          animation.effect?.updateTiming({ delay: Number(timing?.delay ?? 0) + Math.min(index * 70, 210) });
          animation.play();
        });
        pending.delete(target);
        observer.unobserve(target);
      });
    }, { threshold: 0 });

    const prepare = (element: HTMLElement, frames: Keyframe[], delay = 0) => {
      const animation = element.animate(frames, {
        duration: 700, delay, easing: REVEAL_EASE, fill: "both",
      });
      animation.pause();
      animation.currentTime = 0;
      animations.add(animation);
      // Release animation styles so CSS hover effects and opacity keep working.
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(animation);
      };
      return animation;
    };

    collect(root).forEach(target => {
      if (target.contains(document.activeElement)) return;
      const computed = getComputedStyle(target);
      if (computed.display === "none") return;
      const words = target.matches("h1, h2, h3")
        ? Array.from(target.querySelectorAll<HTMLElement>("[data-reveal-word]"))
        : [];
      const distance = computed.getPropertyValue("--revealDistance").trim() || "24px";
      const group = words.length
        ? words.map((word, index) => prepare(word, [
            { opacity: 0, transform: "translateY(105%)" },
            { opacity: getComputedStyle(word).opacity, transform: "none" },
          ], Math.min(index * 25, 200)))
        : [prepare(target, [
            { opacity: 0, ...(computed.transform === "none" && !target.matches("img") ? { transform: `translateY(${distance})` } : {}) },
            { opacity: computed.opacity, ...(computed.transform === "none" && !target.matches("img") ? { transform: "none" } : {}) },
          ])];
      pending.set(target, group);
      observer.observe(target);
    });

    const finish = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      pending.clear();
    };
    const handlePreference = () => {
      if (preference.matches) finish();
    };
    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const focused = event.target;
      // This also handles animations that have already started.
      animations.forEach(animation => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element && (target.contains(focused) || focused.contains(target))) {
          animation.cancel();
          animations.delete(animation);
        }
      });
      pending.forEach((group, target) => {
        if (target.contains(focused)) {
          group.forEach(animation => { animation.cancel(); animations.delete(animation); });
          observer.unobserve(target);
          pending.delete(target);
        }
      });
    };

    preference.addEventListener("change", handlePreference);
    root.addEventListener("focusin", handleFocus);
    return () => {
      finish();
      preference.removeEventListener("change", handlePreference);
      root.removeEventListener("focusin", handleFocus);
    };
  }, [pathname]);

  return <Tag ref={element => { ref.current = element; }} {...props} data-reveal-section>{children}</Tag>;
}
