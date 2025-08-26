import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media', // Enable dark mode with media query (system preferences)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};

export default config;