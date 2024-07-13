/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '24px',
        xl: '40px',
      }
    }
  },
  variants: {
    extend: {
      backdropBlur: ['responsive'],
    },
  },
  plugins: [require("tailwindcss-animate")],
}