export default function CompetitionHeader() {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 text-cfd-charcoal font-sans">
      {/* 1. Editorial Masthead Bar (CFD Signature) */}
      <div className="border-t border-b border-cfd-border/90 py-2.5 sm:py-3 mb-8 sm:mb-12 flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-[0.22em] text-cfd-muted font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cfd-charcoal" />
          <span>Special Edition / Vol. I</span>
        </div>
        <div className="text-right">
          <span>Johannesburg • South Africa</span>
        </div>
      </div>

      {/* 2. Section Sub-Kicker */}
      <div className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-[0.25em] text-cfd-muted font-medium">
        <span>The 2027 Wedding Initiative</span>
        <span className="hidden sm:inline">Closing 20 October 2026</span>
      </div>

      {/* 3. Main Editorial Headline (CFD Signature Italic Treatment) */}
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.05] tracking-tight text-cfd-black text-balance">
        Win a bespoke wedding website. <br className="hidden sm:inline" />
        <span className="italic font-light text-cfd-charcoal">
          Impossible to overlook.
        </span>
      </h1>

      {/* 4. Two-Column Editorial Narrative with Drop-Cap */}
      <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-12 md:grid-cols-12 border-t border-cfd-border/80 pt-8">
        <div className="md:col-span-7 text-base sm:text-lg leading-relaxed text-cfd-charcoal/90 font-serif">
          <p className="m-0">
            <span className="float-left text-5xl sm:text-6xl font-serif font-semibold pr-3 pt-1 leading-none text-cfd-black">
              C
            </span>
            reative Forge Digital is gifting one South African couple a custom-coded, single-page luxury wedding website valued at R4,500. Crafted to elevate your celebration, your bespoke site combines high-end editorial aesthetics with modern web functionality.
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between text-xs sm:text-sm leading-relaxed text-cfd-muted font-sans border-l-0 md:border-l border-cfd-border/80 md:pl-8">
          <p className="m-0">
            Featuring an interactive RSVP management engine, live countdown, digital cash-registry setup, day-of timeline, and travel guide — complete with domain registration and cloud hosting through 14 days after your 2027 wedding.
          </p>
          <div className="mt-4 pt-3 border-t border-cfd-border/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-cfd-charcoal font-semibold">
            <span>Entry Free • SA Residents (18+)</span>
            <span className="text-cfd-muted font-normal">Draw: 23 Oct 2026</span>
          </div>
        </div>
      </div>

      {/* 5. Three-Column Feature Metrics (CFD Image 2 Signature Layout) */}
      <div className="mt-10 sm:mt-14 border-t border-b border-cfd-border/90 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-2xl sm:text-3xl font-medium text-cfd-black">
            Bespoke code
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cfd-muted font-medium">
            Tailored editorial design
          </span>
        </div>

        <div className="flex flex-col gap-1 sm:border-l sm:border-cfd-border/80 sm:pl-8">
          <span className="font-serif text-2xl sm:text-3xl font-medium text-cfd-black">
            Live RSVPs
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cfd-muted font-medium">
            Seamless guest management
          </span>
        </div>

        <div className="flex flex-col gap-1 sm:border-l sm:border-cfd-border/80 sm:pl-8">
          <span className="font-serif text-2xl sm:text-3xl font-medium text-cfd-black">
            2027 Weddings
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cfd-muted font-medium">
            Hosting &amp; domain included
          </span>
        </div>
      </div>

      {/* 6. Action Row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <a
          href="#entry-form"
          className="inline-flex items-center gap-2.5 bg-cfd-black text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <span>Complete Entry Form</span>
          <span className="text-sm">↓</span>
        </a>

        <a
          href="/terms"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cfd-charcoal hover:text-black border-b border-cfd-charcoal/40 pb-1 hover:border-black transition-colors font-semibold"
        >
          <span>Read Competition Terms</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
