import Image from "next/image";
import Reveal from "./Reveal";
import { Sprig } from "./Flourish";

const SCHEDULE = [
  { time: "2:30 PM", title: "Guests arrive", note: "Welcome drinks on the chapel lawn" },
  { time: "3:00 PM", title: "Ceremony", note: "The Glass Chapel" },
  { time: "4:00 PM", title: "Canapés & Cocktails", note: "Live acoustic set in the garden" },
  { time: "5:30 PM", title: "Reception", note: "The Orchard Barn" },
  { time: "7:00 PM", title: "Dinner & Speeches", note: "Family-style, long tables" },
  { time: "9:00 PM", title: "First dance", note: "Then the floor is yours" },
  { time: "12:00 AM", title: "Last dance", note: "Shuttles depart" },
];

export default function Schedule() {
  return (
    <section id="schedule" className="bg-cream px-6 py-27.5">
      <div className="mx-auto grid max-w-[1120px] items-center gap-20 md:grid-cols-2">
        <Reveal className="flex flex-col gap-11">
          <div className="flex flex-col gap-2">
            <div className="text-xs tracking-[0.38em] uppercase text-muted">
              Order of the day
            </div>
            <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso">
              Schedule
            </h2>
            <Sprig className="mt-1 block h-3.5 w-11 text-gold/60" />
          </div>
          <div className="flex flex-col">
            {SCHEDULE.map((s) => (
              <div
                key={s.time + s.title}
                className="grid grid-cols-[96px_24px_1fr] items-start gap-x-5 border-b border-border-soft py-4.5"
              >
                <div className="pt-0.5 text-lg tracking-[0.08em] font-medium text-gold">
                  {s.time}
                </div>
                <div className="flex justify-center pt-2.5">
                  <span className="block h-1.75 w-1.75 rotate-45 bg-gold" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[22px] font-medium text-espresso">
                    {s.title}
                  </div>
                  <div className="text-lg font-light italic text-muted">
                    {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-5">
          <div className="group relative mt-15 aspect-[3/4] w-full overflow-hidden shadow-soft">
            <Image
              src="/images/kiss.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
          </div>
          <div className="group relative mb-15 aspect-[3/4] w-full overflow-hidden shadow-soft">
            <Image
              src="/images/hands.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
