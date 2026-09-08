import Reveal from "./Reveal";
import { SprigDivider } from "./Flourish";

const HOTELS = [
  {
    tag: "On site",
    name: "Rosemary Hill Cottages",
    desc: "Stone cottages among the olive trees, a two-minute walk from the barn. Limited — reserved first for family.",
    price: "From R1 450 / night",
  },
  {
    tag: "10 min away",
    name: "The Farm Inn",
    desc: 'Country hotel with a shuttle to and from the venue on the day. Mention "Kayla & Wynand" for the wedding rate.',
    price: "From R1 100 / night",
  },
  {
    tag: "In the city",
    name: "Hazelwood Boutique Stay",
    desc: "For guests who want to explore Pretoria. Near restaurants, 25 minutes to the venue by car.",
    price: "From R950 / night",
  },
];

const INFO = [
  {
    title: "Flying in",
    text: "O.R. Tambo International is about 45 minutes from the venue. Lanseria is a quieter alternative, roughly an hour away.",
  },
  {
    title: "Getting around",
    text: "Uber and Bolt run reliably to Rosemary Hill. A shuttle will leave the Farm Inn at 2:00 PM and return at midnight.",
  },
  {
    title: "Parking",
    text: "Free, secure parking on site. Cars may be left overnight and collected by 10:00 AM on Sunday.",
  },
];

export default function Travel() {
  return (
    <section id="travel" className="bg-cream px-6 py-27.5">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-16">
        <Reveal className="flex flex-col items-center gap-2.5 text-center">
          <div className="text-xs tracking-[0.38em] uppercase text-muted">
            Getting there &amp; staying over
          </div>
          <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso text-balance">
            Accommodation &amp; Travel
          </h2>
          <SprigDivider className="mt-1" lineClassName="bg-gold/40" />
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {HOTELS.map((h, i) => (
            <Reveal key={h.name} className="h-full" delay={i * 140}>
              <div className="flex h-full flex-col gap-3 border border-border bg-cream-soft px-8.5 py-10 shadow-soft transition-all duration-700 ease-silk hover:-translate-y-1 hover:shadow-lift">
                <div className="text-xs tracking-[0.3em] uppercase text-gold">
                  {h.tag}
                </div>
                <div className="text-[26px] leading-tight font-medium text-espresso">
                  {h.name}
                </div>
                <div className="text-lg leading-relaxed font-light text-espresso-soft text-pretty">
                  {h.desc}
                </div>
                <div className="mt-auto pt-3 text-base italic text-muted">
                  {h.price}
                </div>
                <a
                  href="#"
                  className="link-rule self-start text-xs tracking-[0.3em] uppercase"
                >
                  Book
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-12 border-t border-border-soft pt-6 sm:grid-cols-3">
          {INFO.map((i) => (
            <div key={i.title} className="flex flex-col gap-2">
              <div className="font-script text-[34px] leading-none text-gold">
                {i.title}
              </div>
              <p className="m-0 text-lg leading-relaxed font-light">
                {i.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
