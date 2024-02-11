/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // font-family: 'Raleway', sans-serif;
       Raleway: ['Raleway', 'sans-serif'],
      },
    },
  }, 
  plugins: [],
}