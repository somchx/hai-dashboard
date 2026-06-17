/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF8FF',
          100: '#DBEFFE',
          200: '#B9E0FE',
          300: '#7CC7FD',
          400: '#37A9FA',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0D5C8F',
          950: '#082F49',
        },
        hai: {
          dark: '#0D5C8F',
          mid: '#1473A8',
          light: '#0EA5E9',
          pale: '#EFF8FF',
        }
      },
      fontFamily: {
        sans: ['Sarabun', 'IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
