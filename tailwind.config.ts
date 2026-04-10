import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#B8965A",
        "gold-hover": "#A07A42",
        "site-dark": "#1A1A1A",
        "site-bg": "#FAFAF8",
        muted: "#E8E4DF",
        "card-bg": "#F5F2ED",
        whatsapp: "#25D366",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "Heebo", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 1s ease both",
        "scale-in": "scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 4s ease-in-out infinite",
        "gold-pulse": "goldPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px) rotateY(0deg)" },
          "50%": { transform: "translateY(-8px) rotateY(3deg)" },
        },
        goldPulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(184,150,90,0.3)" },
          "50%": { boxShadow: "0 0 0 12px rgba(184,150,90,0)" },
        },
      },
      boxShadow: {
        gold: "0 8px 30px rgba(184,150,90,0.35)",
        "gold-lg": "0 20px 60px rgba(184,150,90,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
