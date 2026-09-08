import Image from "next/image";
import { Fragment } from "react";
import Reveal from "./Reveal";
import { Sprig } from "./Flourish";

const MOMENTS = [
  {
    year: "2019",
    title: "A braai in Centurion.",
    text: "Kayla arrived late, Wynand was on fire duty, and neither of them remembers what anyone else said that evening.",
  },
  {
    year: "2021",
    title: "A home of our own.",
    text: "One small flat, two opinions about the thermostat, and a very spoiled sausage dog named Biltong.",
  },
  {
    year: "2025",
    title: "The rooftop.",
    text: 'Golden hour over the city, a photographer "just for fun", and a question Kayla had secretly been waiting on for years. She said yes before he finished asking.',
  },
];

export default function Story() {
  return (
    <section id="story" className="bg-cream px-6 pt-15 pb-30">
      <div className="mx-auto grid max-w-[1120px] items-center gap-18 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <Reveal className="relative pr-0 pb-10 md:pr-10">
          <div className="group relative aspect-[3/4] w-full overflow-hidden shadow-frame">
            <Image
              src="/images/smiling.jpg"
              alt="Kayla and Wynand smiling"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover object-[center_30%] transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
          </div>
          <div className="group absolute right-0 bottom-0 aspect-square w-[46%] overflow-hidden border-8 border-cream shadow-lift">
            <Image
              src="/images/ring.jpg"
              alt="The ring"
              fill
              sizes="30vw"
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.08]"
            />
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <div className="text-xs tracking-[0.38em] uppercase text-muted">
              How it began
            </div>
            <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso">
              Our Story
            </h2>
            <Sprig className="mt-1 block h-3.5 w-11 text-gold/60" />
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-5 text-[19px] leading-relaxed font-light">
            {MOMENTS.map((m) => (
              <Fragment key={m.year}>
                <div className="text-xl font-light italic whitespace-nowrap text-gold">
                  {m.year}
                </div>
                <p className="m-0 text-pretty">
                  <strong className="font-medium text-espresso">
                    {m.title}
                  </strong>{" "}
                  {m.text}
                </p>
              </Fragment>
            ))}
          </div>
          <div className="font-script text-[34px] text-gold">
            and now, forever…
          </div>
        </Reveal>
      </div>
    </section>
  );
}
