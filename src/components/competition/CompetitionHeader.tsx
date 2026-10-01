import { SprigDivider } from "../Flourish";

export default function CompetitionHeader() {
  return (
    <header className="relative flex flex-col items-center text-center px-4 pt-12 pb-8 sm:pt-20 sm:pb-12">
      {/* Brand & Badge */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.38em] text-gold font-medium">
          Creative Forge Digital Presents
        </span>
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 bg-cream-soft/80 px-3.5 py-1 text-[11px] font-sans uppercase tracking-[0.25em] text-espresso-soft shadow-xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Official Competition Entry
        </div>
      </div>

      {/* Main Title */}
      <h1 className="mt-5 font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-espresso tracking-tight max-w-4xl text-balance">
        Win a Bespoke <span className="font-script text-5xl sm:text-7xl md:text-8xl text-gold block sm:inline sm:ml-2">Wedding Website</span>
      </h1>

      <SprigDivider className="mt-4 mb-3" lineClassName="bg-gold/40" />

      {/* Value proposition & Subtitle */}
      <p className="max-w-2xl text-base sm:text-xl font-light text-espresso-soft leading-relaxed px-2 font-serif text-balance">
        Celebrate your wedding day with an interactive, custom-designed digital experience featuring guest RSVPs, travel details, gift registry, and your couple story — fully hosted and crafted by <strong>Creative Forge Digital</strong> (Valued at over R15,000).
      </p>

      {/* Value highlights */}
      <div className="mt-7 flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 max-w-3xl text-xs sm:text-sm font-sans text-espresso-soft">
        <div className="flex items-center gap-2 rounded-md border border-border bg-cream-soft/60 px-3.5 py-2 shadow-xs">
          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Custom Bespoke Design</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-border bg-cream-soft/60 px-3.5 py-2 shadow-xs">
          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Instant RSVP Management</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-border bg-cream-soft/60 px-3.5 py-2 shadow-xs">
          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Mobile-Optimized &amp; Cloud Hosted</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-3.5 py-2 font-medium text-espresso shadow-xs">
          <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l4-2 4 2 4-2 4 2V4a2 2 0 00-2-2H5zm0 2h10v11.382l-3-1.5-2 1-2-1-3 1.5V4z" clipRule="evenodd" />
          </svg>
          <span>100% Free Entry • SA Residents</span>
        </div>
      </div>
    </header>
  );
}
