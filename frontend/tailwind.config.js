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
        "button-red": "#ea3636",
        "button-green": "#4CAF50",
        "darker-bg": "#140D3B",
        "main-text": "#2B3674",
        "purple-text": "#4f07a5",
        "sub-text": "#A3AED0",
        "grey-bg": "#F4F7FE",
        "blue-bg": "#eef3ff",
        "home-bg": "#E6E9F7"
      },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

