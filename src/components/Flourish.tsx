export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 90"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 4 C 44 8, 72 22, 92 46 C 106 63, 118 72, 136 76"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {[
        { x: 26, y: 10, r: -18, s: 1 },
        { x: 46, y: 16, r: 10, s: 0.85 },
        { x: 66, y: 27, r: -6, s: 1.1 },
        { x: 84, y: 40, r: 22, s: 0.8 },
        { x: 102, y: 54, r: -14, s: 0.95 },
      ].map((leaf, i) => (
        <path
          key={i}
          d="M0 0 C -1.6 -5, -1.4 -8.5, 0 -12.5 C 1.4 -8.5, 1.6 -5, 0 0 Z"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      ))}
      <circle cx="136" cy="76" r="1.4" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 8 C 12 8, 16 3, 22 8 C 28 13, 32 8, 42 8"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {[
        { x: 12, y: 8, r: -28, s: 1 },
        { x: 32, y: 8, r: 28, s: 1 },
      ].map((leaf, i) => (
        <path
          key={i}
          d="M0 0 C -1.3 -3.6, -1.1 -6, 0 -9 C 1.1 -6, 1.3 -3.6, 0 0 Z"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      ))}
      <circle cx="22" cy="4.5" r="1.1" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}

export function SprigDivider({
  className = "",
  lineClassName = "bg-gold-light/50",
  sprigClassName = "text-gold-light",
}: {
  className?: string;
  lineClassName?: string;
  sprigClassName?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`block h-px w-8 ${lineClassName}`} />
      <Sprig className={`h-3 w-9 ${sprigClassName}`} />
      <span className={`block h-px w-8 ${lineClassName}`} />
    </div>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`font-script leading-none ${className}`}>
      K<span className="mx-0.5 text-[0.62em] opacity-70">&amp;</span>W
    </span>
  );
}

export function MonogramSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.45"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.25"
        />
      </svg>
      <Monogram className="text-[34px]" />
    </div>
  );
}

const PETALS = [
  { left: "8%", size: 4, duration: 25, delay: 1 },
  { left: "18%", size: 5, duration: 22, delay: 9 },
  { left: "27%", size: 4, duration: 26, delay: 6 },
  { left: "36%", size: 3.5, duration: 29, delay: 12 },
  { left: "48%", size: 4.5, duration: 24, delay: 3 },
  { left: "57%", size: 4, duration: 27, delay: 17 },
  { left: "63%", size: 3.5, duration: 28, delay: 10 },
  { left: "72%", size: 5, duration: 21, delay: 4.5 },
  { left: "78%", size: 5, duration: 23, delay: 14 },
  { left: "85%", size: 3.5, duration: 30, delay: 2 },
  { left: "90%", size: 4, duration: 27, delay: 8 },
  { left: "96%", size: 4.5, duration: 25, delay: 19 },
];

export function FloatingPetals() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="animate-petal-drift absolute bottom-[-5%] block rounded-full bg-cream blur-[0.5px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
