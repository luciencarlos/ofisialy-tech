type Props = {
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionHead({ eyebrow, title, text }: Props) {
  return (
    <div className="mb-9 grid max-w-[62ch] gap-2.5">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-[.06em] text-brand">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-cobalt" />
        {eyebrow}
      </span>
      <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-[-.02em]">{title}</h2>
      {text ? (
        <p className={`text-lg ${"text-muted"}`}>{text}</p>
      ) : null}
    </div>
  );
}
