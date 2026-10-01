import type { Metadata } from "next";
import Link from "next/link";
import CompetitionHeader from "@/components/competition/CompetitionHeader";
import CompetitionForm from "@/components/competition/CompetitionForm";

export const metadata: Metadata = {
  title: "Win a Bespoke Wedding Website | Creative Forge Digital",
  description:
    "Enter the Creative Forge Digital competition to stand a chance to win a custom luxury wedding website for your special day. Valued at over R15,000.",
  openGraph: {
    title: "Win a Bespoke Wedding Website | Creative Forge Digital",
    description:
      "Enter now to win a custom luxury wedding website with digital RSVPs, guest info, and bespoke design. Free to enter for South African couples.",
    siteName: "Creative Forge Digital",
  },
};

export default function CompetitionPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-gold/30 selection:text-espresso pb-16">
      {/* Top Bar */}
      <div className="border-b border-border/60 bg-cream-soft/60 px-4 py-3 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-muted hover:text-espresso transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>View Demo Wedding Site</span>
          </Link>

          <span className="text-[11px] font-sans tracking-wider text-muted hidden sm:inline">
            Creative Forge Digital Competition
          </span>
        </div>
      </div>

      {/* Main Header & Form */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CompetitionHeader />
        <CompetitionForm />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/80 pt-8 text-center text-xs text-muted font-sans">
        <div className="mx-auto max-w-2xl px-4 flex flex-col items-center gap-2">
          <p className="m-0 tracking-wider">
            &copy; {new Date().getFullYear()} Creative Forge Digital. All rights reserved.
          </p>
          <p className="m-0 text-[11px] text-muted/80">
            This competition is conducted in accordance with the Consumer Protection Act and the Protection of Personal Information Act (POPIA).
          </p>
        </div>
      </footer>
    </main>
  );
}
