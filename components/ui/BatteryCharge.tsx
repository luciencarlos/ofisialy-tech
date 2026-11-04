/** Petite batterie qui se recharge en boucle (SVG + CSS, quelques octets). */
export function BatteryCharge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} role="img" aria-label="Batterie en charge">
      <rect x="1.5" y="3.5" width="54" height="25" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="58" y="11" width="5" height="10" rx="2" fill="currentColor" />
      <rect className="battery-fill" x="7" y="9" width="43" height="14" rx="2.5" fill="var(--color-sun)" />
    </svg>
  );
}
