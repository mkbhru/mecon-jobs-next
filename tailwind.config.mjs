/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
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
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["winter"], // Ensure 'light' is the first theme
    darkTheme: "winter", // Optional, specifies the dark theme explicitly
  },
};
