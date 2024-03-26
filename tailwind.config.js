/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#140D3B",
        "drop-down-blue": "#f7f7f7",
        "button-purple": "#635CFF",
        "darker-bg": "#140D3B",
      },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

