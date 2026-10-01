"use client";

import { useEffect } from "react";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-cream-soft p-6 shadow-lift sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="pointer-events-none absolute inset-2 border border-gold-light/30" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Terms"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-cream text-espresso transition-colors hover:border-gold hover:text-gold"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-6 font-serif text-espresso">
          <div className="border-b border-gold-light/40 pb-4 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted font-sans">
              Creative Forge Digital
            </span>
            <h3 className="mt-1 font-serif text-3xl font-medium text-espresso sm:text-4xl">
              Competition Terms &amp; Conditions
            </h3>
            <p className="mt-2 text-sm italic text-espresso-soft">
              Win a Bespoke Wedding Website Competition
            </p>
          </div>

          <div className="flex flex-col gap-5 text-sm leading-relaxed text-espresso-soft font-sans">
            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">1. Promoter</h4>
              <p className="mt-1">
                This competition is organized and promoted by Creative Forge Digital (&quot;CFD&quot;).
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">2. Eligibility</h4>
              <p className="mt-1">
                The competition is open exclusively to South African citizens and permanent residents aged 18 years or older at the date of entry. Directors, members, partners, employees, agents of CFD, and their immediate families are ineligible to enter.
              </p>
              <p className="mt-1.5">
                The entrant may be the Bride, Groom, or a member of the bridal party, friend, or family member entering on behalf of the couple. Only one couple can be awarded the prize.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">3. Competition Mechanics &amp; Entry Rules</h4>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>
                  <strong>Entry 1 (Standard):</strong> Complete all required fields of the official online entry form, follow CFD on at least 2 of the 3 specified platforms (Instagram, Facebook, TikTok), and leave a comment tagging 3 friends on the official launch post.
                </li>
                <li>
                  <strong>Entry 2 (Bonus):</strong> Share the competition announcement to your Instagram Story tagging @creativeforgedigital, #CreativeForgeDigital, and your wedding hashtag, and upload a verification screenshot with your entry.
                </li>
                <li>
                  Entries with falsified follower statuses or invalid contact numbers will be disqualified.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">4. The Prize</h4>
              <p className="mt-1">
                One winner will receive a custom, responsive, bespoke Wedding Website designed and built by Creative Forge Digital, including:
              </p>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Custom luxury UI/UX design tailored to the couple&apos;s wedding palette and theme.</li>
                <li>Digital RSVP management, schedule, registry, map/venue details, and couple story.</li>
                <li>12 months of high-speed cloud hosting and custom domain connection support.</li>
              </ul>
              <p className="mt-1.5">
                The prize is strictly non-exchangeable, non-transferable, and cannot be redeemed for cash or discounts on other services.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">5. Draw &amp; Winner Notification</h4>
              <p className="mt-1">
                The winner will be selected via an audited, independent random draw from all verified eligible entries. The winner will be contacted via the email address and phone number supplied in their entry. If a drawn winner does not respond within 5 business days, CFD reserves the right to draw a replacement winner.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">6. Privacy &amp; POPIA Compliance</h4>
              <p className="mt-1">
                In compliance with the Protection of Personal Information Act 4 of 2013 (&quot;POPIA&quot;):
              </p>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>
                  All entrant personal data will be processed solely for the purposes of administering, validating, and awarding this competition.
                </li>
                <li>
                  Marketing communications will only be sent to entrants who explicitly tick the separate marketing consent box.
                </li>
                <li>
                  No personal data will be sold, rented, or distributed to third parties.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-espresso">7. General</h4>
              <p className="mt-1">
                CFD reserves the right to amend, postpone, or cancel the competition in the event of unforeseen circumstances beyond reasonable control. This promotion is in no way sponsored, endorsed, or administered by, or associated with Instagram, Meta, or TikTok.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end border-t border-gold-light/40 pt-4">
            <button
              onClick={onClose}
              className="border border-espresso bg-espresso px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:border-gold font-sans"
            >
              I Understand &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
