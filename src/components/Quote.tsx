import Reveal from "./Reveal";
import { CornerFlourish, Sprig } from "./Flourish";

export default function Quote() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-18 text-center">
      <CornerFlourish className="pointer-events-none absolute left-6 top-10 hidden h-14 w-14 text-gold/25 sm:block" />
      <CornerFlourish className="pointer-events-none absolute right-6 top-10 hidden h-14 w-14 -scale-x-100 text-gold/25 sm:block" />
      <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-5.5">
        <Sprig className="h-3.5 w-11 text-gold/60" />
        <div className="font-script text-[44px] leading-none text-gold">
          Love is patient, love is kind
        </div>
        <p className="m-0 text-[22px] leading-relaxed font-light italic text-espresso-soft text-pretty">
          On a rooftop above Pretoria, as the sun slipped behind the city, he
          asked and she said yes. Now we would be honoured to have you beside
          us as we begin forever.
        </p>
        <div className="text-xs tracking-[0.35em] uppercase text-muted">
          1 Corinthians 13:4
        </div>
      </Reveal>
    </section>
  );
}
