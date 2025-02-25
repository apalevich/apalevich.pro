/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      // emerald: colors.emerald,
      // indigo: colors.indigo,
      // yellow: colors.yellow,
    },
    extend: {
      fontFamily: {
        sans: [
          "Bricolage Grotesque Variable",
          "Inter Variable",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        primary: {
          DEFAULT: "#4a0908",
          50: "#FCE4E3",
          100: "#F9C9C8",
          200: "#F39291",
          300: "#ED5C59",
          400: "#E72522",
          500: "#B81714",
          600: "#81100E",
          700: "#4A0908",
          800: "#330605",
          900: "#170302",
          950: "#0E0201"
        },
        secondary: {
          DEFAULT: "#08494A",
          50: "#DAFAFB",
          100: "#B1F5F7",
          200: "#63ECEE",
          300: "#19E3E6",
          400: "#109698",
          500: "#08494A",
          600: "#063B3C",
          700: "#052D2E",
          800: "#031B1C",
          900: "#010E0E",
          950: "#010909"
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
