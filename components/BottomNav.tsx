"use client";

import { tabLinks } from "@/data/nav";
import { useActiveSection } from "@/lib/useActiveSection";

const paths: Record<string, string> = {
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  box: "M3 7l9-4 9 4v10l-9 4-9-4V7zM3 7l9 4 9-4M12 11v10",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z",
  cart: "M3 4h2l2.4 11h10.2L20 7H6M9 20h.01M17 20h.01",
  chat: "M4 5h16v11H9l-5 4V5z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z",
};

/**
 * Barre d'onglets fixe en bas de l'écran, sur téléphone seulement : on change de section au pouce.
 * Si un numéro de téléphone est renseigné, le dernier onglet devient « Appeler ».
 */
export function BottomNav({ tel = "" }: { tel?: string }) {
  const active = useActiveSection(tabLinks.map((t) => t.href.slice(1)));
  return (
    <nav
      aria-label="Navigation rapide"
      className="on-navy fixed inset-x-0 bottom-0 z-40 border-t border-cyan/25 bg-[#131c38]/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,.45)] backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-1">
        {tabLinks.map((t) => {
          const call = t.icon === "chat" && tel;
          const current = active === t.href.slice(1);
          return (
            <li key={t.href} className="flex-1">
              <a
                href={call ? `tel:${tel}` : t.href}
                aria-current={current ? "location" : undefined}
                className={`mx-0.5 my-1 flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-bold no-underline transition active:scale-95 ${
                  "primary" in t && t.primary
                    ? "bg-gradient-to-r from-[#4f8cff] to-cyan text-sun-ink"
                    : current
                      ? "bg-surface-hi text-cyan"
                      : "text-on-navy-muted hover:text-on-navy"
                }`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={paths[call ? "phone" : t.icon]} />
                </svg>
                {call ? "Appeler" : t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
