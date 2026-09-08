import Reveal from "./Reveal";
import { SprigDivider } from "./Flourish";

const PALETTE = [
  { name: "Champagne", color: "#e9d9c4" },
  { name: "Caramel", color: "#c9a98a" },
  { name: "Dusty Rose", color: "#b9a79b" },
  { name: "Sage", color: "#8c8a72" },
  { name: "Espresso", color: "#5a4636" },
];

export default function DressCode() {
  return (
    <section id="dress" className="bg-espresso px-6 py-27.5 text-cream">
      <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-6.5 text-center">
        <div className="text-xs tracking-[0.38em] uppercase text-gold-light">
          Attire
        </div>
        <h2 className="m-0 font-script text-7xl leading-none font-normal text-ivory">
          Formal
        </h2>
        <SprigDivider
          className="-mt-1.5"
          lineClassName="bg-gold-light/40"
          sprigClassName="text-gold-light/80"
        />
        <p className="m-0 text-xl leading-relaxed font-light text-[#e8dccb] text-pretty">
          Floor-length gowns and dark suits or tuxedos. We&rsquo;d love for
          you to join our palette of soft, sun-warmed neutrals — and kindly
          leave white and ivory to the bride.
        </p>
        <div className="mt-2 flex gap-4.5">
          {PALETTE.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-2.5">
              <span
                className="block h-13.5 w-13.5 rounded-full border border-cream/30"
                style={{ background: p.color }}
              />
              <span className="text-xs tracking-[0.2em] uppercase text-gold-light">
                {p.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-1 text-base italic text-gold-light">
          The ceremony is outdoors on grass — block heels are your friend.
        </div>
      </Reveal>
    </section>
  );
}
