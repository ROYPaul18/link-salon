import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'text-outline': '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        redlink: "#671C16",
        gold: "#CCB073",
      },
      fontFamily: {
        "arcane-nine": ["Arcane Nine", "sans-serif"],
        "artisual-deco": ["Artisual Deco", "sans-serif"],
        reglarik: ["Reglarik", "sans-serif"],
        rehat: ["Rehat", "sans-serif"],
        alte: ['"Alte Haas Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
