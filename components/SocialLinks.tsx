import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { messengerUrl } from "@/lib/order";
import { FacebookIcon, MessengerIcon, PhoneIcon, WhatsAppIcon } from "./ui/Icons";

type Item = {
  key: string;
  label: string;
  href: string;
  external: boolean;
  icon: ReactNode;
  /** Fond du bouton rond */
  bg: string;
  /** Lueur au survol */
  glow: string;
  /** Fond de l'infobulle */
  tip: string;
};

function items(): Item[] {
  const { facebook, whatsapp, phoneDisplay } = siteConfig.contact;
  const fb = messengerUrl();
  const wa = whatsapp.replace(/\D/g, "");
  const tel = phoneDisplay.replace(/[^\d+]/g, "");

  const list: (Item | null)[] = [
    fb ? {
      key: "messenger",
      label: "Messenger",
      href: fb,
      external: true,
      icon: <MessengerIcon className="size-[22px]" />,
      bg: "bg-[linear-gradient(135deg,#0a7cff_0%,#a033ff_100%)] text-white",
      glow: "group-hover:shadow-[0_0_22px_rgba(160,51,255,.65)]",
      tip: "bg-[#8a3ffc] text-white",
    } : null,
    facebook ? {
      key: "facebook",
      label: "Facebook",
      href: facebook,
      external: true,
      icon: <FacebookIcon className="size-5" />,
      bg: "bg-white/10 text-[#5a94ff] border border-white/15",
      glow: "group-hover:shadow-[0_0_18px_rgba(90,148,255,.5)]",
      tip: "bg-[#1877f2] text-white",
    } : null,
    wa ? {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${wa}`,
      external: true,
      icon: <WhatsAppIcon className="size-5" />,
      bg: "bg-white/10 text-[#25d366] border border-white/15",
      glow: "group-hover:shadow-[0_0_18px_rgba(37,211,102,.5)]",
      tip: "bg-[#25d366] text-[#04210f]",
    } : null,
    tel ? {
      key: "phone",
      label: phoneDisplay,
      href: `tel:${tel}`,
      external: false,
      icon: <PhoneIcon className="size-5" />,
      bg: "bg-white/10 text-on-navy border border-white/15",
      glow: "group-hover:shadow-[0_0_18px_rgba(76,201,255,.45)]",
      tip: "bg-sun text-sun-ink",
    } : null,
  ];
  return list.filter((i): i is Item => i !== null);
}

/** Rangée d'icônes rondes avec infobulle au survol. Chaque icône disparaît si le contact n'est pas renseigné dans config/site.ts. */
export function SocialLinks() {
  const links = items();
  if (links.length === 0) return null;

  return (
    <div className="grid gap-3">
      <span className="font-mono text-xs uppercase tracking-[.08em]">Suivez-nous</span>
      <ul className="flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.key} className="relative">
            <a
              href={l.href}
              aria-label={l.key === "phone" ? `Appeler le ${l.label}` : `Ofisialy Tech sur ${l.label}`}
              className="group relative grid size-12 place-items-center rounded-full no-underline"
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 grid place-items-center rounded-full transition duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-110 ${l.bg} ${l.glow}`}
              >
                {l.icon}
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[13px] font-bold opacity-0 shadow-lg transition duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${l.tip}`}
              >
                {l.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
