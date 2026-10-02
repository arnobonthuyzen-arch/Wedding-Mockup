import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Win a Bespoke Wedding Website | Creative Forge Digital",
  description:
    "Enter the Creative Forge Digital competition to stand a chance to win a custom luxury wedding website for your 2027 wedding. Valued at R4,500.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorant.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
