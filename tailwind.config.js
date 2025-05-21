/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        dark: '#1e293b',
        light: '#f8fafc',
      },
      fontFamily: {
        'arcade': ['"Press Start 2P"', 'cursive'],
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
