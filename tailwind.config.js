/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14181f',
          soft: '#4a5260',
        },
        paper: {
          DEFAULT: '#faf8f4',
          dark: '#f1ede4',
        },
        rule: '#e4dfd5',
        accent: {
          DEFAULT: '#2f4bd8',
          dark: '#2338a8',
          soft: '#e8ecfd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}