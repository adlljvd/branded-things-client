module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
    "./public/index.html", // Add your public HTML files if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
