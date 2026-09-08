import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        "1.75": "0.4375rem",
        "4.5": "1.125rem",
        "6.5": "1.625rem",
        "8.5": "2.125rem",
        "13": "3.25rem",
        "13.5": "3.375rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "27": "6.75rem",
        "27.5": "6.875rem",
        "30": "7.5rem",
        "32.5": "8.125rem",
      },
      colors: {
        cream: "#f5efe6",
        "cream-soft": "#f9f4ec",
        taupe: "#ece2d3",
        espresso: "#3b2f26",
        "espresso-soft": "#5a4636",
        gold: "#b8956e",
        "gold-light": "#c9ad8e",
        muted: "#8c7862",
        border: "#dccbb5",
        "border-soft": "#e3d6c3",
        ivory: "#fbf6ee",
      },
      fontFamily: {
        script: ["var(--font-great-vibes)"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 40px -26px rgba(59,47,38,0.30)",
        lift: "0 30px 60px -30px rgba(59,47,38,0.42)",
        frame: "0 24px 60px -30px rgba(59,47,38,0.45)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
