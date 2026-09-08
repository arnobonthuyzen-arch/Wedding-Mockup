import Reveal from "./Reveal";
import { SprigDivider } from "./Flourish";

const CARDS = [
  {
    kicker: "Ceremony",
    time: "3:00 PM",
    name: "The Glass Chapel, Rosemary Hill",
    address: (
      <>
        Plot 2, Zwavelpoort
        <br />
        Pretoria East, 0081
      </>
    ),
  },
  {
    kicker: "Reception",
    time: "5:30 PM",
    name: "The Orchard Barn",
    address: (
      <>
        A short stroll through the gardens
        <br />
        from the chapel
      </>
    ),
  },
];

export default function Details() {
  return (
    <section id="details" className="bg-taupe px-6 py-27.5">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-2.5 text-center">
          <div className="text-xs tracking-[0.38em] uppercase text-muted">
            Saturday, 14 March 2027
          </div>
          <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso">
            The Day
          </h2>
          <SprigDivider className="mt-1" lineClassName="bg-gold/40" />
        </Reveal>
        <div className="grid gap-7 sm:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.kicker} className="h-full" delay={i * 140}>
              <div className="relative flex h-full flex-col items-center gap-4 border border-border bg-cream px-8 py-14 text-center shadow-soft transition-shadow duration-700 ease-silk hover:shadow-lift sm:px-12">
                <span className="pointer-events-none absolute inset-2.5 border border-gold-light/25" />
                <div className="font-script text-[46px] leading-none text-gold">
                  {c.kicker}
                </div>
                <div className="text-[28px] font-normal tracking-[0.08em] text-espresso">
                  {c.time}
                </div>
                <div className="h-px w-10 bg-gold-light" />
                <div className="text-xl font-medium text-espresso">
                  {c.name}
                </div>
                <div className="text-lg leading-relaxed font-light text-espresso-soft">
                  {c.address}
                </div>
                <a
                  href="#"
                  className="link-rule mt-1.5 text-xs tracking-[0.3em] uppercase"
                >
                  Get directions
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
