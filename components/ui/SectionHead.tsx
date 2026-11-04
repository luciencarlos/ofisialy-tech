type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "light" | "navy";
};

export function SectionHead({ eyebrow, title, text, tone = "light" }: Props) {
  const navy = tone === "navy";
  return (
    <div className="mb-9 grid max-w-[62ch] gap-2.5">
      <span className={`font-mono text-xs uppercase tracking-[.08em] ${navy ? "text-cyan" : "text-brand"}`}>
        {eyebrow}
      </span>
      <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-.015em]">{title}</h2>
      {text ? (
        <p className={`text-[17px] ${navy ? "text-on-navy-muted" : "text-muted"}`}>{text}</p>
      ) : null}
    </div>
  );
}
