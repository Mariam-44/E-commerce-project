/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          50: "#e6f8e6",   // Lightest shade
          100: "#c7edc7",
          200: "#a2e2a2",
          300: "#7bd67b",
          400: "#54cb54",
          500: "#0aad0a",   // Base color
          600: "#089408",
          700: "#067a06",
          800: "#045f04",
          900: "#034603",   // Darkest shade
        },
      },
      screens:{
        "2xl":"1320px"
      }
    },
  },
  plugins: [],
}

