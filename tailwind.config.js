// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // make sure Tailwind scans your code
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // replaces default font-sans
        handwriting: ["Moon Time", "cursive"], // custom font
      },
      colors: {
        brand: "var(--brand)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
