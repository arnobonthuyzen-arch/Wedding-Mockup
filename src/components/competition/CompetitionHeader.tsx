import Link from "next/link";
import Image from "next/image";

export default function CompetitionHeader() {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 text-cfd-charcoal font-sans">
      {/* 1. Editorial Masthead Bar (CFD Signature) */}
      <div className="border-t border-b border-cfd-border/90 py-2.5 sm:py-3 mb-8 sm:mb-10 flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-[0.22em] text-cfd-muted font-medium">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-cfd-border bg-black">
            <Image
              src="/images/cfd-logo.png"
              alt="CFD"
              width={20}
              height={20}
              className="h-full w-full object-cover"
            />
          </div>
          <span>Creative Forge Digital • Special Edition / Vol. I</span>
        </div>
        <div className="text-right">
          <span>Johannesburg • South Africa</span>
        </div>
      </div>

      {/* 2. Official Competition Badge Callout */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cfd-border bg-cfd-newsprint px-3.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-cfd-black">
        <span>🤍 WIN A FREE CUSTOM WEDDING WEBSITE — VALUED AT R4,500 🤍</span>
      </div>

      {/* 3. Section Sub-Kicker & Dates */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium">
        <span>The 2027 Wedding Initiative</span>
        <span>Open 2 Oct — 20 Oct 2026, 23:59 SAST</span>
      </div>

      {/* 4. Main Editorial Headline (CFD Signature Italic Treatment) */}
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-cfd-black text-balance">
        Win a bespoke wedding website. <br className="hidden sm:inline" />
        <span className="italic font-light text-cfd-charcoal">
          Impossible to overlook.
        </span>
      </h1>

      {/* 5. Two-Column Editorial Narrative with Drop-Cap */}
      <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-12 md:grid-cols-12 border-t border-cfd-border/80 pt-8">
        <div className="md:col-span-7 text-base sm:text-lg leading-relaxed text-cfd-charcoal/90 font-serif">
          <p className="m-0">
            <span className="float-left text-5xl sm:text-6xl font-serif font-semibold pr-3 pt-1 leading-none text-cfd-black">
              O
            </span>
            ne couple getting married in 2027 will receive a fully custom-coded wedding website — live countdown, RSVP system, guest registry, day-of information, and travel and accommodation details — including design, hosting and domain registration.
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between text-xs sm:text-sm leading-relaxed text-cfd-muted font-sans border-l-0 md:border-l border-cfd-border/80 md:pl-8">
          <div>
            <p className="m-0 font-serif text-cfd-charcoal/80">
              The site goes live <strong>8 months before your wedding</strong> and stays live until <strong>14 days after</strong>. Entries must have a confirmed 2027 wedding date.
            </p>
            <p className="mt-2 m-0 text-[11px] text-cfd-muted font-sans uppercase tracking-wider">
              Winner announced 23 October 2026 • All entries monitored throughout
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-cfd-border/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-cfd-charcoal font-semibold">
            <span>Entry Free • SA Residents (18+)</span>
            <span className="text-cfd-muted font-normal">Draw: 23 Oct 2026</span>
          </div>
        </div>
      </div>

      {/* 6. Three-Column Feature Metrics */}
      <div className="mt-10 sm:mt-12 border-t border-b border-cfd-border/90 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-2xl sm:text-3xl font-medium text-cfd-black">
            Bespoke code
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cfd-muted font-medium">
            Valued at R4,500
          </span>
        </div>

        <div className="flex flex-col gap-1 sm:border-l sm:border-cfd-border/80 sm:pl-8">
          <span className="font-serif text-2xl sm:text-3xl font-medium text-cfd-black">
            Live RSVPs &amp; Registry
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cfd-muted font-medium">
            Day-of info &amp; countdown
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

      {/* 7. Action Row with Jump Links */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#entry-form"
            className="inline-flex items-center gap-2.5 bg-cfd-black text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <span>Complete Entry Form</span>
            <span className="text-sm">↓</span>
          </a>
          <a
            href="#details"
            className="inline-flex items-center gap-2 border border-cfd-border bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cfd-black hover:border-black transition-colors"
          >
            <span>How to Enter</span>
            <span className="text-sm">↓</span>
          </a>
        </div>

        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] font-semibold">
          <a
            href="#prizes"
            className="text-cfd-charcoal hover:text-black border-b border-cfd-charcoal/40 pb-1 hover:border-black transition-colors"
          >
            The Prize Details ↓
          </a>
          <Link
            href="/terms"
            className="text-cfd-muted hover:text-black transition-colors"
          >
            Terms &amp; Conditions →
          </Link>
        </div>
      </div>
    </section>
  );
}
