/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'pt-serif': ['PT Serif', 'serif'],
			'montserrat': ['Montserrat', 'sans-serif']
		},
		extend: {
			colors: {
				// secondary: 'rgb(244, 242, 237)',
				
				black: 'rgb(99, 102, 241)',
				indigo: {
					// 50: 'white',
				},
			},
			backgroundImage: {
				'underline1': "url('/Underline1.svg')",
				'underline1-flip': "url('/Underline1-flip.svg')",
				'underline2': "url('/Underline2.svg')",
				'underline3': "url('/Underline3.svg')",
			},
		},
	},
	plugins: [],
}
