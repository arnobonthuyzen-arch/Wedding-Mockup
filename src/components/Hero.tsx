import Image from "next/image";
import { CornerFlourish, Sprig, FloatingPetals } from "./Flourish";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-espresso"
    >
      <Image
        src="/images/lift.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(59,47,38,0.35) 0%,rgba(59,47,38,0.05) 35%,rgba(59,47,38,0.15) 65%,rgba(59,47,38,0.75) 100%)",
        }}
      />

      <FloatingPetals />

      {/* soft spotlight behind the headline so it stands out from the skyline */}
      <div
        className="pointer-events-none absolute left-1/2 top-[54%] z-[6] h-[65%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,22,16,0.5) 0%, rgba(30,22,16,0.22) 45%, rgba(30,22,16,0) 72%)",
        }}
      />

      <CornerFlourish className="animate-flourish pointer-events-none absolute left-5 top-24 z-10 h-16 w-16 text-cream/70 sm:h-20 sm:w-20 md:left-8" />
      <CornerFlourish className="animate-flourish pointer-events-none absolute right-5 top-24 z-10 h-16 w-16 -scale-x-100 text-cream/70 sm:h-20 sm:w-20 md:right-8" />
      <CornerFlourish className="animate-flourish pointer-events-none absolute bottom-20 left-5 z-10 hidden h-14 w-14 -scale-y-100 text-cream/50 sm:block md:left-8" />
      <CornerFlourish className="animate-flourish pointer-events-none absolute right-5 bottom-20 z-10 hidden h-14 w-14 -scale-x-100 -scale-y-100 text-cream/50 sm:block md:right-8" />

      <div className="animate-hero-in relative z-10 flex flex-1 flex-col items-center justify-end gap-3.5 px-6 pt-14 pb-28 text-center">
        <div className="text-sm tracking-[0.4em] uppercase text-cream/85">
          Together with their families
        </div>
        <Sprig className="animate-sprig-glow -mb-1 h-3.5 w-11 text-gold-light/80" />
        <h1
          className="m-0 font-script text-[clamp(72px,11vw,150px)] leading-none font-normal text-ivory"
          style={{
            textShadow:
              "0 2px 6px rgba(30,22,16,0.55), 0 10px 44px rgba(30,22,16,0.55), 0 0 90px rgba(201,173,142,0.35)",
          }}
        >
          Kayla <span className="align-middle text-[0.55em] opacity-85">&amp;</span> Wynand
        </h1>
        <div className="mt-1.5 flex items-center gap-4.5 text-cream">
          <span className="block h-px w-15 bg-cream/60" />
          <span className="text-xl tracking-[0.3em]">14 · 03 · 2027</span>
          <span className="block h-px w-15 bg-cream/60" />
        </div>
        <div className="text-[17px] italic text-cream/90">
          Pretoria, South Africa
        </div>
      </div>

      <a
        href="#story"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-cream/70 transition-colors duration-500 hover:text-cream"
      >
        <span>Scroll</span>
        <span className="animate-bob block h-8.5 w-px bg-cream" />
      </a>
    </section>
  );
}
