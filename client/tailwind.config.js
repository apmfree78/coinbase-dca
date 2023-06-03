/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: false,
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
