import type { Metadata } from "next";
import Link from "next/link";
import CfdNavbar from "@/components/competition/CfdNavbar";
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
    <div className="min-h-screen bg-cfd-newsprint text-cfd-charcoal selection:bg-cfd-black selection:text-white font-sans antialiased">
      {/* Floating Dark Pill Navigation (CFD Signature) */}
      <CfdNavbar />

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 sm:pt-10 pb-20">
        <CompetitionHeader />
        <CompetitionForm />
      </main>

      {/* Signature CFD Dark Editorial Footer */}
      <footer className="border-t border-cfd-border-dark bg-cfd-black text-white/80 pt-16 pb-12 font-sans text-xs">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col gap-12">
          {/* Top Row: Brand & Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 font-serif italic text-lg text-white">
                CF
              </div>
              <div>
                <span className="font-serif text-lg text-white tracking-wide block">
                  Creative Forge Digital
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Studio &amp; Digital Lab • Johannesburg
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium text-white/70">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <a
                href="mailto:admin@creativeforge.digital.co.za"
                className="hover:text-white transition-colors"
              >
                admin@creativeforge.digital.co.za
              </a>
              <a
                href="https://creativeforgedigital.co.za"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline flex items-center gap-1"
              >
                <span>creativeforgedigital.co.za</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Editorial Credits (CFD Footnote Style) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-white/40">
            <div>
              &copy; {new Date().getFullYear()} Creative Forge Digital. All Rights Reserved.
            </div>
            <div>
              Consumer Protection Act (68 of 2008) &amp; POPIA Compliant
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
