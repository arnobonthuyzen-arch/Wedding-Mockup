"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CfdNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#121212]/90 px-4 py-2.5 sm:px-6 sm:py-3 shadow-lift backdrop-blur-md text-white font-sans">
        {/* Left: Brand Monogram + Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black transition-transform group-hover:border-white/50 group-hover:scale-105">
            <Image
              src="/images/cfd-logo.png"
              alt="Creative Forge Digital"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="font-serif text-sm sm:text-base tracking-wide text-white font-normal group-hover:text-white/90 transition-colors">
            Creative Forge Digital
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium">
          <Link
            href="/"
            className="text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white transition-colors"
          >
            Competition
          </Link>
          <a
            href="#details"
            className="hover:text-white transition-colors"
          >
            How To Enter
          </a>
          <a
            href="#prizes"
            className="hover:text-white transition-colors"
          >
            The Prize
          </a>
          <Link
            href="/terms"
            className="hover:text-white transition-colors"
          >
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Right: External Site Link & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://creativeforgedigital.co.za"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/90 hover:bg-white hover:text-black hover:border-white transition-all font-medium"
          >
            <span>Visit Studio</span>
            <span className="text-xs">↗</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:border-white transition-colors"
          >
            <div className="flex flex-col gap-1 w-3.5">
              <span className={`block h-0.5 w-full bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 w-full bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-[#121212]/95 p-5 shadow-lift backdrop-blur-md md:hidden font-sans text-xs uppercase tracking-[0.2em] flex flex-col gap-4 text-white/80">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-semibold py-1 border-b border-white/10"
          >
            Competition Entry
          </Link>
          <a
            href="#details"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-white/10"
          >
            How To Enter
          </a>
          <a
            href="#prizes"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-white/10"
          >
            The Prize
          </a>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-white/10"
          >
            Terms &amp; Conditions
          </Link>
          <a
            href="https://creativeforgedigital.co.za"
            target="_blank"
            rel="noreferrer"
            className="pt-1 text-gold flex items-center justify-between"
          >
            <span>creativeforgedigital.co.za</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
}
