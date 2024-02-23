/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'main' : ['Spoqa Han Sans Neo']
      },
    },

    colors:{
      'primary' : '#009652',
      'secondary' : '#CCF2E1',
      'disabled' : '#E0E0E0',
      'primary-border' : '#00713E',
      'secondary-border' : '#009652',
      'primary-btn-text' : '#FFFEFE',
      'secondary-btn-text':'#070707',
      'disabled-btn-text' : '#9E9E9E',
    }
  },
  plugins: [],
};
