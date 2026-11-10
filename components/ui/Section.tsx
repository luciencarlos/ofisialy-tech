import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Bloc de page : même espacement vertical partout, et trois fonds qui alternent
 * (clair, blanc encadré, marine) pour rythmer la lecture.
 */
const tones = {
  base: "bg-bg",
  surface: "border-y border-line bg-surface",
  navy: "border-y border-line bg-surface",
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
