import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Instrument Serif", "serif"],
      },
      colors: {
        bg: "oklch(var(--bg) / <alpha-value>)",
        surface: "oklch(var(--surface) / <alpha-value>)",
        "surface-strong": "oklch(var(--surface-strong) / <alpha-value>)",
        "text-primary": "oklch(var(--text) / <alpha-value>)",
        muted: "oklch(var(--muted) / <alpha-value>)",
        stroke: "oklch(var(--stroke) / <alpha-value>)",
        pink: "oklch(var(--brand-pink) / <alpha-value>)",
        purple: "oklch(var(--brand-purple) / <alpha-value>)",
        blue: "oklch(var(--brand-blue) / <alpha-value>)",
        cyan: "oklch(var(--brand-cyan) / <alpha-value>)",
      },
      animation: {
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "role-fade-in": "role-fade-in 0.4s ease-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
