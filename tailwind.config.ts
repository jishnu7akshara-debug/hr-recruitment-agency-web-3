import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "#FAF8F5",
          warm: "#F5F1EA",
          surface: "#FFFFFF",
          border: "#E7E2D9",
        },
        bronze: {
          DEFAULT: "#9E7E4F",
          light: "#B89B6C",
          hover: "#83673C",
          dark: "#68502B",
          subtle: "rgba(158, 126, 79, 0.08)",
        },
        gold: {
          DEFAULT: "#9E7E4F",
          light: "#EADCC9",
          hover: "#83673C",
          dark: "#68502B",
          subtle: "rgba(158, 126, 79, 0.1)",
        },
        obsidian: {
          DEFAULT: "#18181B",
          dark: "#0F0F11",
          surface: "#27272A",
          card: "#18181B",
          border: "#3F3F46",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          surface: "#FFFFFF",
          border: "#E7E2D9",
        },
        slate: {
          muted: "#71717A",
          light: "#A1A1AA",
          dark: "#27272A",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: ".25em",
        extrawide: ".35em",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ken-burns": "kenburns 20s ease infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(158, 126, 79, 0.2)",
        luxury: "0 20px 40px -15px rgba(24, 24, 27, 0.08)",
        card: "0 10px 30px -10px rgba(24, 24, 27, 0.05)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
