module.exports = {
  content: [
    "./resources/views/**/*.{html,js,hbs}",
    "./resources/views/layout.hbs",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        secondary: "rgba(124, 153, 5, 1)",
        dark: "#282828",
      },
      screens: {
        xs: "350px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
