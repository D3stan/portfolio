/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        border: "var(--border)",
        card: "var(--card)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        "accent-fg": "var(--accent-fg)",
        "void-fg": "var(--void-fg)",
        highlight: "var(--highlight)",
        chip: "var(--chip)",
        chrome: "var(--chrome)",
      },
      fontFamily: {
        // Use CSS vars so themes can swap fonts without code changes
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
        osd: ["var(--font-osd)"],
      },
    },
  },
  plugins: [],
};
