/** @type {import('tailwindcss').Config} */

import colors, { indigo } from "tailwindcss/colors";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: false, // or 'media' or 'class',
	theme: {
		colors: {
			black: '#000000',
			white: '#ffffff',
			transparent: 'transparent',
			// secondary: "white",
			// black: "rgb(99, 102, 241)",
			// white: "white",
			// beige: "#F4F2ED",
			// beige: "#FED800"
			// gray: colors.gray,
			indigo: {
				50: '#eef2ff',
				100: '#e0e7ff',
				200: '#c7d2fe',
				300: '#a5b4fc',
				400: '#818cf8',
				500: '#6366f1',
				600: '#4f46e5',
				700: '#4338ca',
				800: '#3730a3',
				900: '#312e81',
				950: '#1e1b4b',
			  },
			  amber: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
			  },
		},
		fontFamily: {
			"pt-serif": ["PT Serif", "serif"],
			montserrat: ["Montserrat", "sans-serif"],
		},
		backgroundSize: {
			auto: "auto",
			cover: "cover",
			contain: "contain",
			"100%": "100%",
		},
		extend: {
			backgroundImage: {
				underline1: "url('/src/images/Underline1.svg')",
				"underline1-flip": "url('/src/images/drawings/Underline1-flip.svg')",
				underline2: "url('/src/images/drawings/Underline2.svg')",
				underline3: "url('/src/images/drawings/Underline3.svg')",
				underline4: "url('/src/images/drawings/Underline4.svg')",
				underline5: "url('/src/images/drawings/Underline5.svg')",
				underline6: "url('/src/images/drawings/Underline6.svg')",
				underline7: "url('/src/images/drawings/Underline7.svg')",
				underline8: "url('/src/images/drawings/Underline8.svg')",
				underline9: "url('/src/images/drawings/Underline9.svg')",
				underline10: "url('/src/images/drawings/Underline10.svg')",
			},
			keyframes: {
				"fade-in-down": {
					"0%": {
						opacity: "0",
						transform: "translateY(-10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
			},
			animation: {
				"fade-in-down": "fade-in-down 0.5s ease-out",
			},
		},
	},
	plugins: [],
};
