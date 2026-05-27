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
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        pink: "hsl(var(--brand-pink))",
        purple: "hsl(var(--brand-purple))",
        blue: "hsl(var(--brand-blue))",
        cyan: "hsl(var(--brand-cyan))",
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
