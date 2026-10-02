import type { Metadata } from "next";
import Link from "next/link";
import CompetitionHeader from "@/components/competition/CompetitionHeader";
import CompetitionForm from "@/components/competition/CompetitionForm";

export const metadata: Metadata = {
  title: "Win a Bespoke Wedding Website | Creative Forge Digital",
  description:
    "Enter the Creative Forge Digital competition to stand a chance to win a custom luxury wedding website for your 2027 wedding. Valued at R4,500. Free to enter for South African residents aged 18+.",
  openGraph: {
    title: "Win a Bespoke Wedding Website | Creative Forge Digital",
    description:
      "Enter now to win a custom luxury wedding website with digital RSVPs, guest info, and bespoke design. Exclusively for 2027 South African weddings.",
    siteName: "Creative Forge Digital",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-cream selection:bg-gold/30 selection:text-espresso pb-16">
      {/* Top Banner */}
      <div className="border-b border-border/60 bg-cream-soft/80 px-4 py-3 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-semibold tracking-wider text-espresso">
              CREATIVE FORGE DIGITAL
            </span>
          </div>

          <Link
            href="/terms"
            className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold hover:text-espresso transition-colors font-medium"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>

      {/* Main Competition Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CompetitionHeader />
        <CompetitionForm />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/80 pt-8 text-center text-xs text-muted font-sans">
        <div className="mx-auto max-w-2xl px-4 flex flex-col items-center gap-2.5">
          <p className="m-0 tracking-wider">
            &copy; {new Date().getFullYear()} Creative Forge Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/terms" className="text-gold hover:underline">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <a
              href="mailto:admin@creativeforge.digital.co.za"
              className="text-gold hover:underline"
            >
              admin@creativeforge.digital.co.za
            </a>
          </div>
          <p className="m-0 text-[11px] text-muted/80">
            This competition is conducted in accordance with the Consumer Protection Act 68 of 2008 and the Protection of Personal Information Act (POPIA).
          </p>
        </div>
      </footer>
    </main>
  );
}
