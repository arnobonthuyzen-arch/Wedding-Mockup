import Link from "next/link";

export default function PrizeSection() {
  const prizeFeatures = [
    {
      number: "01",
      title: "Live Countdown Clock",
      subtitle: "Real-Time Anticipation",
      description:
        "An elegant, animated live countdown ticking down to the exact moment of your wedding ceremony.",
    },
    {
      number: "02",
      title: "Digital RSVP System",
      subtitle: "Guest List Management",
      description:
        "Interactive attendance confirmations, plus-one tracking, dietary requirements, and instant guest list updates.",
    },
    {
      number: "03",
      title: "Guest Registry & Gifting",
      subtitle: "Effortless Contributions",
      description:
        "Curated wish-list links and direct digital card payout details so guests can celebrate and gift with ease.",
    },
    {
      number: "04",
      title: "Day-of Schedule & Itinerary",
      subtitle: "Seamless Coordination",
      description:
        "Ceremony timing, cocktail hour, reception schedule, dress code notes, and venue directions with interactive maps.",
    },
    {
      number: "05",
      title: "Travel & Accommodation Guide",
      subtitle: "Curated Guest Experience",
      description:
        "Recommendations for nearby lodging, flights, airport transfers, shuttle schedules, and favorite local spots.",
    },
    {
      number: "06",
      title: "Design, Hosting & Domain",
      subtitle: "Complete Digital Production",
      description:
        "Full bespoke editorial art direction, custom domain registration, and high-speed SSL cloud hosting included.",
    },
  ];

  return (
    <section id="prizes" className="relative my-12 sm:my-16 text-cfd-charcoal font-sans scroll-mt-24">
      {/* Container Box */}
      <div className="border border-cfd-border/90 bg-white p-6 sm:p-14 shadow-lift">
        {/* Section Header */}
        <div className="border-b border-cfd-border/80 pb-8">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-2">
            <span>The Official Prize</span>
            <span>Valued at R4,500</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cfd-border bg-cfd-newsprint px-3.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-cfd-black mb-3">
            <span>🤍 Win a Free Custom Wedding Website — Valued at R4,500 🤍</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cfd-black leading-tight">
            One couple getting married in 2027 <br className="hidden sm:inline" />
            <span className="italic font-light text-cfd-charcoal">
              will receive a fully custom-coded wedding website.
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-cfd-muted font-serif">
            Crafted from the ground up by Creative Forge Digital — complete with bespoke editorial design, live countdown, digital RSVP engine, guest registry, day-of itinerary, travel and accommodation details, cloud hosting, and domain registration.
          </p>
        </div>

        {/* 6 Feature Blocks Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prizeFeatures.map((feature) => (
            <div
              key={feature.number}
              className="border border-cfd-border/80 bg-cfd-newsprint p-5 sm:p-6 flex flex-col justify-between hover:border-cfd-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-cfd-muted font-medium mb-3">
                  <span>Feature</span>
                  <span className="font-mono text-cfd-black font-bold">{feature.number}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-cfd-black">
                  {feature.title}
                </h3>
                <span className="block mt-1 text-[11px] uppercase tracking-[0.18em] text-cfd-muted font-medium">
                  {feature.subtitle}
                </span>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cfd-charcoal/80 font-serif">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Specifications & Covered Timeline Bar */}
        <div className="mt-10 border border-cfd-border bg-cfd-newsprint p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-cfd-border pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-cfd-muted font-semibold block mb-1">
                Hosting &amp; Deployment Window
              </span>
              <div className="font-serif text-2xl font-medium text-cfd-black">
                8 Months Before → 14 Days After
              </div>
              <p className="mt-2 text-xs leading-relaxed text-cfd-muted font-serif">
                The site goes live 8 months before your wedding date and stays live until 14 days after. Ongoing hosting is available thereafter if you wish to preserve the site indefinitely.
              </p>
            </div>

            <div className="md:col-span-8 md:pl-4 grid gap-4 sm:grid-cols-2 text-xs leading-relaxed text-cfd-charcoal font-serif">
              <div className="flex flex-col gap-1">
                <strong className="font-sans text-[11px] uppercase tracking-wider text-cfd-black">
                  • 2027 Calendar Year Only
                </strong>
                <p className="m-0 text-cfd-muted">
                  Entries must have a confirmed 2027 wedding date. The prize is exclusively reserved for 2027 celebrations (Clause 2.8).
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="font-sans text-[11px] uppercase tracking-wider text-cfd-black">
                  • Asset &amp; Photography Delivery
                </strong>
                <p className="m-0 text-cfd-muted">
                  High-resolution photography and visual assets are supplied by the couple via Google Drive for immaculate rendering.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="font-sans text-[11px] uppercase tracking-wider text-cfd-black">
                  • Revisions &amp; Maintenance
                </strong>
                <p className="m-0 text-cfd-muted">
                  Includes full design approval and minor post-launch content updates. Optional extras (e.g. post-wedding thank-you page, seating charts) available on request.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="font-sans text-[11px] uppercase tracking-wider text-cfd-black">
                  • Non-Transferable &amp; No Fees
                </strong>
                <p className="m-0 text-cfd-muted">
                  Zero fees to accept the prize. The prize cannot be exchanged for cash or transferred to another couple.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-cfd-border/80">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-xs uppercase tracking-wider text-cfd-muted font-medium">
              Prize Value: R4,500 • 1 Confirmed 2027 Winner
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#details"
              className="text-xs uppercase tracking-[0.2em] text-cfd-charcoal hover:text-black border-b border-cfd-charcoal/40 pb-1 hover:border-black transition-colors font-semibold"
            >
              How to Enter ↓
            </a>
            <Link
              href="/terms"
              className="text-xs uppercase tracking-[0.2em] text-cfd-muted hover:text-black transition-colors"
            >
              Read Full Terms →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
