/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D437D",
      },
      width: {
        "card": "337.795px",
        "a4": "793.701px"
      },
      height: {
        "card": "212.992px",
        "a4": "1108.661px"
      },
      spacing: {
        "a4-padding-w": "59.055px",
        "a4-padding-h": "21.85px",
        "a4-padding-h2": "43.7px",
      }
    },
    fontFamily: {
      nunitoBold: ["NunitoBold", "Helvetica", "Arial", "sans-serif"],
      nunitoBoldItalic: ["NunitoBoldItalic", "Helvetica", "Arial", "sans-serif"],
      nunitoRegular: ["NunitoRegular", "Helvetica", "Arial", "sans-serif"],
      nicoMojiRegular: ["NicoMojiRegular", "Helvetica", "Arial", "sans-serif"],
      gideonRomanRegular: ["GideonRomanRegular", "Helvetica", "Arial", "sans-serif"],
    },
    screens: {
      "1359px": { min: "1359px" },
      "1140px": { min: "1140px", max: "1358px" },
      "1087px": { min: "1087px", max: "1139px" },
      "843px": { min: "843px", max: "1086px" },
      "600px": { min: "600px", max: "842px" },
      // => @media (min-width: 1359px) { ... }
    },
  },
  plugins: [],
});
