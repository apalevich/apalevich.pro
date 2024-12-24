/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: false, // or 'media' or 'class',
	theme: {
		colors: {
			secondary: "white",
			black: "rgb(99, 102, 241)",
			white: "white",
			beige: "#F4F2ED",
			// beige: "#FED800"
			gray: colors.gray
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
				"underline1-flip": "url('/src/images/Underline1-flip.svg')",
				underline2: "url('/src/images/Underline2.svg')",
				underline3: "url('/src/images/Underline3.svg')",
				underline4: "url('/src/images/Underline4.svg')",
				underline5: "url('/src/images/Underline5.svg')",
				underline6: "url('/src/images/Underline6.svg')",
				underline7: "url('/src/images/Underline7.svg')",
				underline8: "url('/src/images/Underline8.svg')",
				underline9: "url('/src/images/Underline9.svg')",
				underline10: "url('/src/images/Underline10.svg')",
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
