/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ColorBlack: '#121212',
        ColorDark: '#0A102F',
        ColorLight: '#FDFBF9',
        ColorLime: '#C1FF00',
        ColorLimeAlt: '#A6FF00',
        ColorPurple: '#6B3FF2'
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        PublicSans: ['Public Sans', 'sans-serif']
      },
      borderRadius: {
        xs: '3px',
        sm: '5px',
        md: '10px'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem'
        }
      },
      maxWidth: {
        container: '1320px'
      }
    }
  }
};
