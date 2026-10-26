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
          glow: "rgba(242, 223, 181, 0.25)",
        },
        ivory: "var(--ivory)",
        cream: "var(--cream)",
        charcoal: "var(--charcoal)",
        "near-black": "var(--near-black)",
        "surface-dark": "var(--surface-dark)",
        "surface-card": "var(--surface-card)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-border": "var(--surface-border)",
        "surface-border-gold": "var(--surface-border-gold)",
        bronze: "var(--gold)",
        beige: "var(--gold-light)",
        wood: "var(--gold-dark)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        body: ["var(--font-body)"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      letterSpacing: {
        widest2: "0.22em",
        superwide: "0.3em",
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(242, 223, 181, 0.25)",
        "gold-glow-lg": "0 0 60px -10px rgba(242, 223, 181, 0.35)",
        "glass-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gold-shimmer": "linear-gradient(135deg, #FBF0D9 0%, #F2DFB5 45%, #CFA662 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(242, 223, 181, 0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
