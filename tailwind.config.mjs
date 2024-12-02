/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: false, // or 'media' or 'class',
	theme: {
		colors: {
			secondary: "#white",
			black: "rgb(99, 102, 241)",
			white: "white",
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
				'underline1': "url('/src/images/Underline1.svg')",
				'underline1-flip': "url('/src/images/Underline1-flip.svg')",
				'underline2': "url('/src/images/Underline2.svg')",
				'underline3': "url('/src/images/Underline3.svg')",
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
}
