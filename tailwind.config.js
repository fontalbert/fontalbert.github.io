export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#232936",
        paper: "#fdfbf7",
        night: "#f1ece3",
        card: "#f5f2ee",
        hairline: "rgba(128,128,128,0.3)",
        // Acento (sol de noviembre del favicon); el valor cambia con la fase del cielo en App.jsx
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ['"Albert Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1060px",
      },
      borderRadius: {
        card: "22px",
        box: "26px",
      },
    },
  },
  plugins: [],
};
