/** @type {import('tailwindcss').Config} */

let plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchVariant, theme }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: 'n', // Default value for `nth:`
            '2n': '2n', // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
            '3n': '3n',
            '4n': '4n',
            '5n': '5n',
          },
        }
      );
    }),
  ],
}

