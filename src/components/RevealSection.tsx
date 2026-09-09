"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { animate, inView, type AnimationPlaybackControls } from "motion";

type RevealSectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "footer" | "nav" | "div";
};

const REVEAL_DURATION = 0.85;
const REVEAL_INTERVAL = 0.08;
const MAX_DELAY = 0.24;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const WORD_INTERVAL = 0.035;
const WORD_DURATION = 1.1;
const IMAGE_DURATION = 1.45;
const IMAGE_INTERVAL = 0.1;

/** Keeps the original layout and server-rendered content accessible without JS. */
export function RevealSection({ as: Tag = "section", children, ...props }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<Element, AnimationPlaybackControls[]>();
    const revealed = new WeakSet<Element>();
    let stopObserving = () => {};

    // Split layout containers, but keep cards, forms and sliders intact.
    const collect = (parent: Element): HTMLElement[] =>
      Array.from(parent.children).flatMap(child => {
        if (!(child instanceof HTMLElement)) return [];
        if (child.matches(".container, .grid, [data-reveal-group]")) return collect(child);
        if (getComputedStyle(child).position === "absolute" && !child.hasAttribute("data-reveal")) return [];
        return [child];
      });

    const targets = collect(root);
    const finish = () => {
      stopObserving();
      animations.forEach(group => group.forEach(animation => animation.complete()));
      animations.clear();
    };
    const observe = () => {
      finish();
      if (preference.matches) return;
      stopObserving = inView(targets, element => {
        if (revealed.has(element) || element.contains(document.activeElement)) return;
        revealed.add(element);
        const computed = getComputedStyle(element);
        const distance = computed.getPropertyValue("--revealDistance").trim();
        const siblings = targets.filter(target => target.parentElement === element.parentElement);
        const delay = Math.min(siblings.findIndex(target => target === element) * REVEAL_INTERVAL, MAX_DELAY);
        const words = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-word]"));
        const images = element.matches("img") ? [element] : Array.from(element.querySelectorAll("img"));
        const isHeading = element.matches("h1, h2, h3");
        const group: AnimationPlaybackControls[] = [];
        // Headings unfold through word masks; other content settles into place.
        if (!isHeading || words.length === 0) group.push(animate(element, {
          opacity: [0, 1],
          // Preserve existing positioning transforms on images and interactive content.
          ...(computed.transform === "none" && !element.matches("img") ? { transform: [`translateY(${distance})`, "none"] } : {}),
        }, { duration: REVEAL_DURATION, delay, ease: REVEAL_EASE }));
        words.forEach((word, index) => {
          group.push(animate(word, {
            transform: ["translateY(105%) rotate(2deg)", "none"],
            opacity: [0, 1],
          }, {
            duration: WORD_DURATION,
            delay: delay + Math.min(index * WORD_INTERVAL, MAX_DELAY * 2),
            ease: REVEAL_EASE,
          }));
        });
        images.forEach((image, index) => {
          // Keep CSS positioning and gallery transforms untouched.
          group.push(animate(image, {
            clipPath: ["inset(12% 0% 12% 0%)", "inset(0% 0% 0% 0%)"],
            ...(image.parentElement?.hasAttribute("data-reveal-image-frame") && getComputedStyle(image).transform === "none"
              ? { transform: ["scale(1.08)", "none"] }
              : {}),
          }, {
            duration: IMAGE_DURATION,
            delay: delay + Math.min(index * IMAGE_INTERVAL, MAX_DELAY),
            ease: REVEAL_EASE,
          }));
        });
        animations.set(element, group);
      }, { amount: "some" });
    };
    const handleFocus = (event: FocusEvent) => {
      targets.forEach(target => {
        if (event.target instanceof Node && target.contains(event.target)) {
          revealed.add(target);
          animations.get(target)?.forEach(animation => animation.complete());
        }
      });
    };

    observe();
    preference.addEventListener("change", observe);
    root.addEventListener("focusin", handleFocus);
    return () => {
      finish();
      preference.removeEventListener("change", observe);
      root.removeEventListener("focusin", handleFocus);
    };
  }, []);

  return <Tag ref={element => { ref.current = element; }} {...props}>{children}</Tag>;
}
