"use client";

import { useEffect, useState } from "react";

/** Renvoie l'identifiant de la section affichée (pour surligner le lien ou l'onglet correspondant). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");
  const key = ids.join("|");
  useEffect(() => {
    const els = key.split("|").map((id) => document.getElementById(id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting) setActive(id);
          else setActive((a) => (a === id ? "" : a));
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}
