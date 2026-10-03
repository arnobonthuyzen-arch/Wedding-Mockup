"use client";

import { useEffect } from "react";
import Image from "next/image";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-cfd-border bg-white p-6 shadow-lift sm:p-10 text-cfd-charcoal font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Terms"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cfd-border bg-cfd-newsprint text-cfd-charcoal transition-colors hover:border-black hover:text-black cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-6">
          <div className="border-b border-cfd-border/80 pb-5 text-center">
            <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cfd-border bg-black shadow-xs">
              <Image
                src="/images/cfd-logo.png"
                alt="Creative Forge Digital"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-cfd-muted font-medium">
              Creative Forge Digital
            </span>
            <h3 className="mt-1 font-serif text-3xl font-medium text-cfd-black sm:text-4xl">
              Win a Wedding Website Competition
            </h3>
            <p className="mt-1 text-sm italic font-serif text-cfd-muted">
              Official Terms and Conditions (2027 Calendar Year)
            </p>
            <div className="mt-3 inline-block rounded-xs border border-cfd-border bg-cfd-newsprint px-3 py-1.5 text-[11px] text-cfd-muted">
              Consumer Protection Act 68 of 2008 &amp; POPIA Compliant
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm leading-relaxed text-cfd-charcoal font-sans">
            {/* 1. Creative Forge Digital */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                1. Creative Forge Digital
              </h4>
              <p className="mt-1 font-serif text-cfd-muted">
                <strong>1.1</strong> The competition is run by Creative Forge Digital, contactable at{" "}
                <a
                  href="mailto:admin@creativeforge.digital.co.za"
                  className="text-cfd-black underline hover:text-neutral-600"
                >
                  admin@creativeforge.digital.co.za
                </a>.
              </p>
            </div>

            {/* 2. The Prize */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                2. The Prize
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
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
            </div>

            {/* 3. Competition Period */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                3. Competition Period
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
                <li>
                  <strong>3.1</strong> The competition opens on <strong>2 October 2026 at 00:00</strong> and closes on <strong>20 October 2026 at 23:59</strong> (South African standard time). Late entries will not be accepted.
                </li>
                <li>
                  <strong>3.2</strong> All entries are monitored on an ongoing basis throughout the competition period.
                </li>
              </ul>
            </div>

            {/* 4. How to Enter */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                4. How to Enter
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
                <li>
                  <strong>4.1 Entry 1 (required — counts as one entry):</strong> To enter, participants must:
                  <div className="pl-4 mt-1 space-y-1 text-cfd-muted">
                    <p>(a) Follow Creative Forge Digital on at least 2 of the following 3 platforms: Instagram, Facebook, and TikTok;</p>
                    <p>(b) Comment on the designated entry post, tagging 3 friends; and</p>
                    <p>(c) Complete the entry form available via the link in Creative Forge Digital&apos;s bio or official competition website.</p>
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
            </div>

            {/* 5. Who May Enter */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                5. Who May Enter
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
                <li>
                  <strong>5.1</strong> The competition is open to South African residents aged 18 or older. Entrants are not required to be engaged or planning their own wedding in order to enter.
                </li>
                <li>
                  <strong>5.2</strong> The prize will only be awarded to a couple with a confirmed wedding date taking place in the 2027 calendar year.
                </li>
                <li>
                  <strong>5.3</strong> Where the entrant randomly drawn is not themselves getting married in 2027, they may nominate the couple on whose behalf they entered, and that couple will receive the prize, subject to confirmation of their 2027 wedding date.
                </li>
                <li>
                  <strong>5.4</strong> The following people may not enter: directors, members, partners, employees, agents and consultants of Creative Forge Digital, of any supplier of the prize, or of any marketing service provider involved in the competition, and anyone who directly or indirectly controls or is controlled by any of them. Their spouses, life partners, business partners and immediate family members are also excluded.
                </li>
              </ul>
            </div>

            {/* 6. Choosing the Winner */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                6. Choosing the Winner
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
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
            </div>

            {/* 7. Claiming the Prize */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                7. Claiming the Prize
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
                <li>
                  <strong>7.1</strong> The winner, and the couple receiving the prize where different from the entrant, must provide proof of identity, proof of the confirmed 2027 wedding date, and sign an acknowledgement of receipt of the prize.
                </li>
                <li>
                  <strong>7.2</strong> Creative Forge Digital may keep a record of the winner&apos;s name and ID number as required by the Consumer Protection Act.
                </li>
              </ul>
            </div>

            {/* 8. Publicity */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                8. Publicity
              </h4>
              <p className="mt-1 font-serif text-cfd-muted">
                <strong>8.1</strong> The winner may choose whether their name, image, or website is used in Creative Forge Digital&apos;s marketing. Consent will be requested separately, and they may refuse. Refusing does not affect the prize.
              </p>
            </div>

            {/* 9. Personal Information */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                9. Personal Information
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
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
            </div>

            {/* 10. Social Media Platforms */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                10. Social Media Platforms
              </h4>
              <p className="mt-1 font-serif text-cfd-muted">
                <strong>10.1</strong> This competition is not sponsored, endorsed or administered by, or associated with, Instagram, Facebook, Meta, TikTok or any other platform. Entrants release these platforms from all liability.
              </p>
            </div>

            {/* 11. General */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-cfd-black">
                11. General
              </h4>
              <ul className="mt-1.5 space-y-2 list-none pl-0 font-serif">
                <li>
                  <strong>11.1</strong> Creative Forge Digital may disqualify entries that are fraudulent, automated, submitted from fake accounts, or otherwise in breach of these rules. Entries are monitored constantly for this purpose.
                </li>
                <li>
                  <strong>11.2</strong> If circumstances beyond its control make it necessary, Creative Forge Digital may amend or end the competition. Any change will be published on Creative Forge Digital&apos;s website or social media platforms, and entrants&apos; rights under the Consumer Protection Act will not be affected.
                </li>
                <li>
                  <strong>11.3</strong> These rules are available free of charge at{" "}
                  <span className="font-semibold text-cfd-black">https://wedding.creativeforgedigital.co.za/terms</span> and on request from{" "}
                  <a
                    href="mailto:admin@creativeforge.digital.co.za"
                    className="text-cfd-black underline hover:text-neutral-600"
                  >
                    admin@creativeforge.digital.co.za
                  </a>.
                </li>
                <li>
                  <strong>11.4</strong> By entering, participants agree to be bound by these Terms and Conditions in full. Entries that do not comply with these Terms and Conditions will be disqualified.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex justify-end border-t border-cfd-border/80 pt-4">
            <button
              onClick={onClose}
              className="border border-cfd-black bg-cfd-black px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800 cursor-pointer font-sans"
            >
              I Understand &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
