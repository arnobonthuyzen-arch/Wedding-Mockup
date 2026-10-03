export default function HowToEnter() {
  return (
    <section id="details" className="relative my-12 sm:my-16 text-cfd-charcoal font-sans scroll-mt-24">
      <div className="border border-cfd-border/90 bg-white p-6 sm:p-14 shadow-lift">
        {/* Section Header */}
        <div className="border-b border-cfd-border/80 pb-8">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-2">
            <span>Competition Guide</span>
            <span>Rules &amp; Verification</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cfd-black leading-tight">
            How to enter. <br className="hidden sm:inline" />
            <span className="italic font-light text-cfd-charcoal">
              Simple steps. Up to two entries.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-cfd-muted font-serif">
            Follow the entry requirements below to secure your place in the audited random draw. Every entry is monitored and validated by Creative Forge Digital.
          </p>

          {/* Timeline & Status Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-6 border-t border-cfd-border/60 pt-4 text-xs font-medium uppercase tracking-wider text-cfd-charcoal">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                <strong>Open:</strong> 2 October — 20 October 2026, 23:59 SAST
              </span>
            </div>
            <div className="text-cfd-muted hidden sm:inline">•</div>
            <div>
              <span>
                <strong>Winner Announced:</strong> 23 October 2026
              </span>
            </div>
            <div className="text-cfd-muted hidden sm:inline">•</div>
            <div className="text-cfd-muted">
              <span>All entries monitored throughout</span>
            </div>
          </div>
        </div>

        {/* Two-Column Entry Mechanics: Entry 1 vs Bonus Entry */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* ======================================================== */}
          {/* ENTRY 1: STANDARD ENTRY */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between border border-cfd-border/90 bg-cfd-newsprint p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cfd-black">
                  Required Action
                </span>
                <span className="bg-cfd-black text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                  Entry 1 (1 Entry)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-cfd-black">
                Standard Entry
              </h3>
              <p className="mt-2 text-xs text-cfd-muted font-serif italic">
                Complete all three steps to qualify for the draw:
              </p>

              <ol className="mt-6 space-y-5 pl-0 list-none">
                <li className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cfd-black text-white text-xs font-mono font-semibold">
                    1
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed text-cfd-charcoal">
                    <strong className="block font-sans font-semibold text-cfd-black">
                      Follow us on at least 2 of 3 platforms:
                    </strong>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <a
                        href="https://instagram.com/creativeforgedigital"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 border border-cfd-border bg-white px-2.5 py-1 text-[11px] font-semibold text-cfd-black hover:border-black transition-colors"
                      >
                        <span>Instagram @creativeforgedigital</span>
                        <span>↗</span>
                      </a>
                      <a
                        href="https://facebook.com/creativeforgedigital"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 border border-cfd-border bg-white px-2.5 py-1 text-[11px] font-semibold text-cfd-black hover:border-black transition-colors"
                      >
                        <span>Facebook</span>
                        <span>↗</span>
                      </a>
                      <a
                        href="https://tiktok.com/@creativeforgedigital"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 border border-cfd-border bg-white px-2.5 py-1 text-[11px] font-semibold text-cfd-black hover:border-black transition-colors"
                      >
                        <span>TikTok @creativeforgedigital</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cfd-black text-white text-xs font-mono font-semibold">
                    2
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed text-cfd-charcoal">
                    <strong className="block font-sans font-semibold text-cfd-black">
                      Comment below, tagging 3 friends
                    </strong>
                    <p className="mt-0.5 m-0 text-cfd-muted font-serif">
                      Leave a comment on our official competition post on Instagram, Facebook, or TikTok and tag 3 friends. You can verify this by providing a link or uploading a screenshot in the form below.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cfd-black text-white text-xs font-mono font-semibold">
                    3
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed text-cfd-charcoal">
                    <strong className="block font-sans font-semibold text-cfd-black">
                      Complete the entry form — link in bio
                    </strong>
                    <p className="mt-0.5 m-0 text-cfd-muted font-serif">
                      Fill out your entrant details and wedding information on the form below. You can also upload screenshots showing that you follow us (2 optional photo uploads) to speed up verification.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mt-8 pt-4 border-t border-cfd-border">
              <a
                href="#entry-form"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-cfd-black hover:underline"
              >
                <span>Jump to Entry Form</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BONUS ENTRY: STORY SHARE */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between border border-cfd-border/90 bg-cfd-newsprint p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cfd-black">
                  Optional Multiplier
                </span>
                <span className="bg-amber-600 text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                  Bonus Entry (2nd Entry)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-cfd-black">
                Story Bonus Entry
              </h3>
              <p className="mt-2 text-xs text-cfd-muted font-serif italic">
                Double your chances with a verified Story post:
              </p>

              <div className="mt-6 space-y-4">
                <p className="text-xs sm:text-sm leading-relaxed text-cfd-charcoal font-sans">
                  Post the competition post to your Instagram Story with all three requirements:
                </p>

                <ul className="space-y-2.5 list-none pl-0 text-xs sm:text-sm text-cfd-charcoal">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cfd-black" />
                    <span>
                      <strong>1. Your own wedding hashtag</strong> (e.g. #KaylaAndWynand2027)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cfd-black" />
                    <span>
                      <strong>2. #CreativeForgeDigital</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cfd-black" />
                    <span>
                      <strong>3. Tag us</strong> (@creativeforgedigital)
                    </span>
                  </li>
                </ul>

                {/* 24-hour validity callout */}
                <div className="border-l-2 border-cfd-black bg-white p-4 text-xs leading-relaxed text-cfd-charcoal">
                  <strong className="block text-cfd-black font-semibold mb-0.5">
                    ⏱️ Story has to be live for 24 hours to be a valid entry
                  </strong>
                  <span className="text-cfd-muted font-serif">
                    Take a screenshot of your Story before it expires, and upload it in Section 3 of the form below to lock in your bonus entry.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cfd-border flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-cfd-muted">
                Max 2 Entries Per Person
              </span>
              <a
                href="#entry-form"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-cfd-black hover:underline"
              >
                <span>Upload Screenshot Below</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ESSENTIAL RULES & ELIGIBILITY EDITORIAL CHECKLIST */}
        {/* ======================================================== */}
        <div className="mt-10 border border-cfd-border bg-cfd-newsprint p-6 sm:p-8">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-3">
            <span>Essential Terms</span>
            <span>Rules at a Glance</span>
          </div>

          <h3 className="font-serif text-2xl font-normal text-cfd-black mb-6">
            Key rules &amp; eligibility.
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-xs leading-relaxed font-serif text-cfd-charcoal">
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  Max 2 Entries Per Person
                </strong>
                <span>
                  One standard entry via follow, comment &amp; form, plus one optional bonus entry via Story share. Duplicate entries will be reconciled.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  Anyone Can Enter
                </strong>
                <span>
                  You don&apos;t need to be getting married yourself to enter! Friends, family members, and the wedding party are welcome to enter for a couple.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  Entering for Someone Else
                </strong>
                <span>
                  If you&apos;re entering on behalf of someone else, <em>your own name and details</em> must still go on the form — but the wedding date and wedding hashtag must be theirs.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  Confirmed 2027 Wedding Date
                </strong>
                <span>
                  The prize is only awarded to a couple with a confirmed 2027 wedding date. Dates falling outside 2027 are not eligible (Clause 2.8).
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  South African Residents (18+)
                </strong>
                <span>
                  Entrants must be South African residents aged 18 or older at the time of entry, per Consumer Protection Act guidelines.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-cfd-black">✓</span>
              <div>
                <strong className="block font-sans text-xs uppercase tracking-wider text-cfd-black mb-1">
                  Audited Random Draw
                </strong>
                <span>
                  Winner is drawn at random from valid, verified entries on <strong>23 October 2026</strong> using an audited, screen-recorded random selector.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
