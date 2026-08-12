export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "vintage-cream": "#F5F1E6",
        "vintage-obsidian": "#0B0B0C",
        "vintage-umber": "#2C1810",
        "vintage-gold": "#D4AF37",
        "vintage-terracotta": "#8A5A44",
        "vintage-sand": "#E8DCC8",
        "vintage-emerald": "#1B3B2B",
        "vintage-burnished": "#C5A059",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
        script: ['"Pinyon Script"', "cursive"],
      },
    },
  },
  plugins: [],
};
