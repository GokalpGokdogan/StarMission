/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#0B023E",
        "drop-down-blue": "#f7f7f7",
        "button-purple": "#635CFF",
      },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

