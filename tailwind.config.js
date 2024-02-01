/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#2C2C2C",
        "background-2": "#1E1E1E"
      }
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

