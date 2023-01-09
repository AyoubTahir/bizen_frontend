/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#0F1222",
      secondary: "#0062FF",
      secondaryLight: "#3381ff",
      secondaryDark: "#004ecc",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#9e9e9e",
    },
    fontFamily: {
      manrope: ["Manrope"],
    },
    extend: {},
  },
  plugins: [],
};
