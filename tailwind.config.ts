import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)",
          muted: "var(--gold-muted)",
        },
        surface: {
          DEFAULT: "var(--surface-card)",
          elevated: "var(--surface-elevated)",
          card: "var(--surface-card)",
          border: "var(--surface-border)",
          dark: "#0D0D0D",
        },
        near: {
          black: "var(--near-black)",
          elevated: "var(--surface-elevated)",
          card: "var(--surface-card)",
          border: "var(--surface-border)",
        },
        ivory: "var(--ivory)",
        muted: "var(--text-muted)",
        subtle: "var(--text-subtle)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      letterSpacing: {
        architectural: "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
