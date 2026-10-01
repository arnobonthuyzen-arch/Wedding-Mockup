import { SprigDivider, MonogramSeal } from "./Flourish";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4.5 bg-espresso px-6 pt-20 pb-12 text-center text-gold-light">
      <MonogramSeal className="mb-3 text-gold-light" />
      <div className="font-script text-6xl leading-none text-ivory">
        Kayla &amp; Wynand
      </div>
      <SprigDivider
        className="-mt-1.5"
        lineClassName="bg-gold-light/40"
        sprigClassName="text-gold-light/80"
      />
      <div className="text-sm tracking-[0.35em] uppercase">
        14 · 03 · 2027 · Pretoria
      </div>
      <div className="mt-5 text-base italic opacity-80">
        Share your photos with #KaylaAndWynand
      </div>
      <a
        href="/competition"
        className="mt-3 text-xs tracking-[0.18em] uppercase text-gold hover:text-ivory transition-colors font-sans"
      >
        ✦ Win a Bespoke Wedding Website by Creative Forge Digital
      </a>
      <a
        href="#top"
        className="link-rule mt-5 text-[11px] tracking-[0.3em] uppercase text-gold-light opacity-70 transition-opacity hover:text-gold-light hover:opacity-100"
      >
        Back to top
      </a>
    </footer>
  );
}
