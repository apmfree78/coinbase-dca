/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ['./src/**/*.{ts,tsx}', './public/**/*.{html}'],
  theme: {
    extend: {
      backgroundColor: ['focus'],
    },
  },
  variants: {
    extend: {},
  },
};
