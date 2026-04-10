/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      primary: "#FF6B6B",     // soft red
      secondary: "#4ECDC4",   // teal
      yellow: "#FFE66D",
      purple: "#A29BFE",
      background: "#F7F9FC"
    },
    },
  },
  plugins: [],
}