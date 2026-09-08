"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import { Sprig } from "./Flourish";

const BANK_DETAILS = "FNB · K & W van der Merwe · 62 000 000 000";

export default function Registry() {
  const [copied, setCopied] = useState(false);

  const copyBank = async () => {
    try {
      await navigator.clipboard?.writeText(BANK_DETAILS);
    } catch {
      // clipboard unavailable — ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="registry" className="bg-taupe px-6 py-27.5">
      <div className="mx-auto grid max-w-[1120px] items-center gap-18 md:grid-cols-2">
        <Reveal className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <div className="text-xs tracking-[0.38em] uppercase text-muted">
              Gifts
            </div>
            <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso">
              Honeymoon Fund
            </h2>
            <Sprig className="mt-1 block h-3.5 w-11 text-gold/60" />
          </div>
          <p className="m-0 text-xl leading-relaxed font-light text-pretty">
            Your presence on our day is truly the greatest gift. Should you
            wish to spoil us, we are saving for two weeks of slow mornings and
            long dinners along the Amalfi coast.
          </p>
          <div className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-2.5 border border-border bg-cream px-8 py-7 text-lg">
            <span className="pt-1 text-xs tracking-[0.2em] uppercase text-muted">
              Bank
            </span>
            <span className="font-medium text-espresso">FNB</span>
            <span className="pt-1 text-xs tracking-[0.2em] uppercase text-muted">
              Account
            </span>
            <span className="font-medium text-espresso">
              K &amp; W van der Merwe
            </span>
            <span className="pt-1 text-xs tracking-[0.2em] uppercase text-muted">
              Number
            </span>
            <span className="font-medium text-espresso">62 000 000 000</span>
            <span className="pt-1 text-xs tracking-[0.2em] uppercase text-muted">
              Reference
            </span>
            <span className="font-medium text-espresso">Your name</span>
          </div>
          <button
            onClick={copyBank}
            className="cursor-pointer self-start bg-espresso px-8.5 py-4 text-[13px] tracking-[0.3em] uppercase text-cream shadow-soft transition-all duration-500 ease-silk hover:-translate-y-0.5 hover:bg-espresso-soft hover:shadow-lift"
          >
            {copied ? "Copied" : "Copy bank details"}
          </button>
        </Reveal>
        <Reveal>
          <div className="group relative aspect-[4/5] w-full overflow-hidden shadow-frame">
            <Image
              src="/images/ring-kiss.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-cover object-[center_60%] transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
