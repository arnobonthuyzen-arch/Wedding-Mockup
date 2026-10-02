import type { Metadata } from "next";
import Link from "next/link";
import CfdNavbar from "@/components/competition/CfdNavbar";

export const metadata: Metadata = {
  title: "Terms and Conditions | Win a Wedding Website Competition",
  description:
    "Official Terms and Conditions for the Creative Forge Digital Win a Wedding Website Competition, governed by the Consumer Protection Act and POPIA.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cfd-newsprint text-cfd-charcoal font-sans antialiased">
      <CfdNavbar />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-10 pb-20">
        <div className="border border-cfd-border/90 bg-white p-6 sm:p-14 shadow-lift relative">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cfd-muted hover:text-cfd-black transition-colors font-medium mb-8"
          >
            <span>←</span>
            <span>Back to Competition Entry</span>
          </Link>

          {/* Header */}
          <div className="border-b border-cfd-border/80 pb-8 mb-10">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-2">
              <span>Official Rules</span>
              <span>Consumer Protection Act &amp; POPIA</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-cfd-black">
              Competition Terms &amp; Conditions
            </h1>
            <p className="mt-2 text-sm italic font-serif text-cfd-muted">
              Win a Bespoke Wedding Website Competition (2027 Calendar Year)
            </p>
          </div>

          {/* Terms Content */}
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-cfd-charcoal font-sans">
            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                1. Creative Forge Digital
              </h2>
              <p className="mt-2 text-cfd-muted font-serif">
                <strong>1.1</strong> The competition is run by Creative Forge Digital, contactable at{" "}
                <a href="mailto:admin@creativeforge.digital.co.za" className="text-cfd-black underline hover:text-neutral-600">
                  admin@creativeforge.digital.co.za
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                2. The Prize
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>2.1</strong> One (1) winner will receive one custom-coded wedding website, valued at <strong>R4,500</strong>, including design, hosting, and domain registration.
                </li>
                <li>
                  <strong>2.2</strong> The prize includes: a single-page custom wedding website featuring a live countdown, an integrated RSVP system, a gift registry / card payout setup, day-of information, and travel and accommodation details.
                </li>
                <li>
                  <strong>2.3</strong> The website will be live from <strong>8 months before</strong> the winning couple&apos;s confirmed wedding date until <strong>14 days after</strong> that date.
                </li>
                <li>
                  <strong>2.4</strong> After this period, the website may remain live only if the couple pays the monthly hosting fee. Creative Forge Digital is under no obligation to keep the site live if this fee is not paid.
                </li>
                <li>
                  <strong>2.5</strong> The prize excludes: a post-wedding &ldquo;Thank You&rdquo; page (available as an optional paid extra), seating plans or seating charts (available at an additional charge), multi-page layouts, and any feature beyond the base RSVP and gift payout setup (available on separate quote).
                </li>
                <li>
                  <strong>2.6</strong> Maintenance under the prize covers minor content adjustments only, once the initial design has been approved. Full redesigns are not included.
                </li>
                <li>
                  <strong>2.7</strong> All images and visual assets for the website must be supplied by the winning couple in high resolution via Google Drive. Creative Forge Digital is not responsible for poor display quality resulting from low-resolution assets supplied by the couple.
                </li>
                <li>
                  <strong>2.8</strong> <strong>The winner must have a confirmed wedding date taking place within the 2027 calendar year. Only weddings in 2027 are eligible for the prize.</strong>
                </li>
                <li>
                  <strong>2.9</strong> The prize is not transferable and cannot be exchanged for cash.
                </li>
                <li>
                  <strong>2.10</strong> The winner will not be charged any fee to accept or receive the prize, other than the hosting fee described in clause 2.4 if applicable after the covered period.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                3. Competition Period
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>3.1</strong> The competition opens on <strong>2 October 2026 at 00:00</strong> and closes on <strong>20 October 2026 at 23:59</strong> (South African standard time). Late entries will not be accepted.
                </li>
                <li>
                  <strong>3.2</strong> All entries are monitored on an ongoing basis throughout the competition period.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                4. How to Enter
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>4.1 Entry 1 (required — counts as one entry):</strong> To enter, participants must:
                  <div className="pl-4 mt-1 space-y-1 text-cfd-muted">
                    <p>(a) Follow Creative Forge Digital on at least 2 of the following 3 platforms: Instagram, Facebook, and TikTok;</p>
                    <p>(b) Comment on the designated entry post, tagging 3 friends; and</p>
                    <p>(c) Complete the entry form available via the link in Creative Forge Digital&apos;s bio.</p>
                  </div>
                </li>
                <li>
                  <strong>4.2 Entry 2 (optional — counts as a second entry):</strong> In addition to Entry 1, participants may:
                  <div className="pl-4 mt-1 space-y-1 text-cfd-muted">
                    <p>(a) Post the competition content to their Instagram Story, tagging Creative Forge Digital, using the hashtag #CreativeForgeDigital together with their own unique wedding hashtag, with the Story remaining live for a full 24 hours; and</p>
                    <p>(b) Upload a screenshot of that Story to the entry form before it expires, as proof of completion.</p>
                  </div>
                </li>
                <li>
                  <strong>4.3</strong> A maximum of two (2) entries per person will be accepted. Duplicate or invalid entries will count as one entry, or may be disqualified at Creative Forge Digital&apos;s discretion.
                </li>
                <li>
                  <strong>4.4</strong> Entry is free, and no purchase is required.
                </li>
                <li>
                  <strong>4.5</strong> Participants may enter on behalf of another couple&apos;s wedding. Where this occurs, the entry form must reflect the entrant&apos;s own name and contact details. Only the wedding date and the wedding hashtag need to relate to the actual couple being entered.
                </li>
                <li>
                  <strong>4.6</strong> Accounts must be public, or Creative Forge Digital must otherwise be able to verify the required actions, so that entries can be confirmed as valid.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                5. Who May Enter
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>5.1</strong> The competition is open to South African residents aged 18 or older. Entrants are not required to be engaged or planning their own wedding in order to enter.
                </li>
                <li>
                  <strong>5.2</strong> <strong>The prize will only be awarded to a couple with a confirmed wedding date taking place in the 2027 calendar year.</strong>
                </li>
                <li>
                  <strong>5.3</strong> Where the entrant randomly drawn is not themselves getting married in 2027, they may nominate the couple on whose behalf they entered, and that couple will receive the prize, subject to confirmation of their 2027 wedding date.
                </li>
                <li>
                  <strong>5.4</strong> The following people may not enter: directors, members, partners, employees, agents and consultants of Creative Forge Digital, of any supplier of the prize, or of any marketing service provider involved in the competition, and anyone who directly or indirectly controls or is controlled by any of them. Their spouses, life partners, business partners and immediate family members are also excluded.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                6. Choosing the Winner
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>6.1</strong> The winner will be chosen at random from all valid, verified entries on <strong>23 October 2026</strong>, using a certified random selection tool, screen-recorded and audited for fairness.
                </li>
                <li>
                  <strong>6.2</strong> The winner will be contacted using the details provided on the entry form and announced on Creative Forge Digital&apos;s social media platforms by <strong>26 October 2026</strong>.
                </li>
                <li>
                  <strong>6.3</strong> If the winner does not respond within <strong>7 days</strong>, or cannot accept the prize, Creative Forge Digital may draw another winner.
                </li>
                <li>
                  <strong>6.4</strong> Creative Forge Digital&apos;s decision is final. No correspondence will be entered into regarding the selection process.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                7. Claiming the Prize
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>7.1</strong> The winner, and the couple receiving the prize where different from the entrant, must provide proof of identity, proof of the confirmed 2027 wedding date, and sign an acknowledgement of receipt of the prize.
                </li>
                <li>
                  <strong>7.2</strong> Creative Forge Digital may keep a record of the winner&apos;s name and ID number as required by the Consumer Protection Act.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                8. Publicity
              </h2>
              <p className="mt-2 font-serif text-cfd-charcoal">
                <strong>8.1</strong> The winner may choose whether their name, image or website is used in Creative Forge Digital&apos;s marketing. Consent will be requested separately, and they may refuse. Refusing does not affect the prize.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                9. Personal Information
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>9.1</strong> Personal information collected on the entry form is used only to run this competition and to contact the winner, in line with the Protection of Personal Information Act (POPIA).
                </li>
                <li>
                  <strong>9.2</strong> Entrants will only receive marketing communication from Creative Forge Digital if they opt in separately on the entry form. They may unsubscribe at any time.
                </li>
                <li>
                  <strong>9.3</strong> Information will be stored securely and kept only as long as needed, including the 3-year record-keeping period required by law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                10. Social Media Platforms
              </h2>
              <p className="mt-2 font-serif text-cfd-charcoal">
                <strong>10.1</strong> This competition is not sponsored, endorsed or administered by, or associated with, Instagram, Facebook, Meta, TikTok or any other platform. Entrants release these platforms from all liability.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-cfd-black">
                11. General
              </h2>
              <ul className="mt-2 space-y-2 list-none pl-0 font-serif text-cfd-charcoal">
                <li>
                  <strong>11.1</strong> Creative Forge Digital may disqualify entries that are fraudulent, automated, submitted from fake accounts, or otherwise in breach of these rules. Entries are monitored constantly for this purpose.
                </li>
                <li>
                  <strong>11.2</strong> If circumstances beyond its control make it necessary, Creative Forge Digital may amend or end the competition. Any change will be published on Creative Forge Digital&apos;s website or social media platforms, and entrants&apos; rights under the Consumer Protection Act will not be affected.
                </li>
                <li>
                  <strong>11.3</strong> These rules are available free of charge at{" "}
                  <span className="font-semibold text-cfd-black">https://wedding.creativeforgedigital.co.za/terms</span> and on request from{" "}
                  <a href="mailto:admin@creativeforge.digital.co.za" className="text-cfd-black underline hover:text-neutral-600">
                    admin@creativeforge.digital.co.za
                  </a>.
                </li>
                <li>
                  <strong>11.4</strong> By entering, participants agree to be bound by these Terms and Conditions in full. Entries that do not comply with these Terms and Conditions will be disqualified.
                </li>
              </ul>
            </section>
          </div>

          {/* Bottom Action */}
          <div className="mt-12 pt-6 border-t border-cfd-border flex justify-between items-center flex-wrap gap-4">
            <Link
              href="/"
              className="border border-cfd-black bg-cfd-black px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800 transition-colors"
            >
              Back to Entry Form →
            </Link>
            <span className="text-xs text-cfd-muted">
              &copy; {new Date().getFullYear()} Creative Forge Digital
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
