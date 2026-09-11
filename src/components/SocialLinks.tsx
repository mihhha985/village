import type { ReactNode } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";
import { Instagram } from "lucide-react";
import { cn } from "@/src/lib/utils";

type SocialNetwork = "telegram" | "whatsapp" | "instagram" | "vk";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
  hoverClassName: string;
};

const SOCIAL_LINKS: Record<SocialNetwork, SocialLink> = {
  telegram: {
    label: "Открыть Telegram",
    href: "https://t.me/",
    icon: <FaTelegramPlane aria-hidden="true" />,
    hoverClassName: "group-hover:text-[#2AABEE]",
  },
  whatsapp: {
    label: "Открыть WhatsApp",
    href: "https://www.whatsapp.com/",
    icon: <FaWhatsapp aria-hidden="true" />,
    hoverClassName: "group-hover:text-[#25D366]",
  },
  instagram: {
    label: "Открыть Instagram",
    href: "https://www.instagram.com/",
    icon: <Instagram aria-hidden="true" />,
    hoverClassName: "group-hover:text-[#E4405F]",
  },
  vk: {
    label: "Открыть ВКонтакте",
    href: "https://vk.com/",
    icon: <IoLogoVk aria-hidden="true" />,
    hoverClassName: "group-hover:text-[#0077FF]",
  },
};

interface SocialLinksProps {
  services?: SocialNetwork[];
  className?: string;
  linkClassName?: string;
}

/** Neutral links to social platforms while individual accounts are not configured. */
export function SocialLinks({
  services = ["telegram", "whatsapp", "instagram", "vk"],
  className,
  linkClassName,
}: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {services.map(service => {
        const link = SOCIAL_LINKS[service];

        return (
          <a
            key={service}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className={cn(
              "group inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-transparent text-foreground shadow-sm transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:shadow-[0_8px_20px_rgba(222,166,109,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              linkClassName
            )}
          >
            <span className={cn("inline-flex size-5 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110 [&>svg]:size-full", link.hoverClassName)}>
              {link.icon}
            </span>
          </a>
        );
      })}
    </div>
  );
}
