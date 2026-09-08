"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Flourish";

const LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#details", label: "The Day" },
  { href: "#travel", label: "Travel" },
  { href: "#registry", label: "Registry" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${
        scrolled
          ? "border-b border-cream/10 bg-espresso/90 py-3.5 backdrop-blur-md sm:py-4"
          : "border-b border-transparent bg-transparent py-5 sm:py-7"
      }`}
    >
      <Monogram
        className={`absolute left-7 top-1/2 hidden -translate-y-1/2 text-[26px] text-ivory transition-all duration-700 ease-silk md:block ${
          scrolled ? "opacity-100" : "-translate-x-2 opacity-0"
        }`}
      />
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 sm:gap-x-9 sm:px-6">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link text-[11px] tracking-[0.12em] uppercase text-cream/85 transition-colors hover:text-cream sm:text-[13px] sm:tracking-[0.28em]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
