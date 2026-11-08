import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Bloc de page : même espacement vertical partout, et trois fonds qui alternent
 * (clair, blanc encadré, marine) pour rythmer la lecture.
 */
const tones = {
  base: "bg-bg/66",
  surface: "border-y border-line bg-surface/85",
  navy: "on-navy bg-navy/92 text-on-navy",
} as const;

export function Section({
  id,
  tone = "base",
  children,
}: {
  id: string;
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-14 md:py-[72px] ${tones[tone]}`}>
      <Container>{children}</Container>
    </section>
  );
}
