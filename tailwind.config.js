const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'dark': "#1B1B1B",
      'deep': "#181818"
    },
    screens: {
      ...defaultTheme.screens,
      'desktop': '1440px'
    },
    extend: {
      colors: {
        "my-mixin": "var(--my-mixin)"
      },
    },
  },
  plugins: [],
}