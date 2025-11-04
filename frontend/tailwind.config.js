/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-section": "url('/assets/HeroSection.jpg')",
        "hero-gradient":
          "linear-gradient(to bottom, #000000, #166534 50%, #000000)", // Add your gradient
        "hero-texture": "url('/assets/noise-texture.jpg')", // Texture layer
      },
      screens: {
        // 1em = 16px
        xsMobile: { max: "20em" }, // max: 320px
        miniMobile: { min: "20.063em", max: "25.75em" }, // min: 321px, max: 412px
        mobile: { min: "25.813em", max: "25.999em" }, // min: 413px, max: 415px
        miniTablet: { min: "26em", max: "31.25em" }, // min: 416px, max: 500px
        tablet: { min: "31.313em", max: "37.5em" }, // min: 501px, max: 600px
        miniLaptop: { min: "37.563em", max: "42em" }, // min: 601px, max: 672px
        laptop: { min: "42.063em", max: "56.25em" }, // min: 673px, max: 900px
        desktop: { min: "56.313em", max: "75em" }, // min: 901px, max: 1200px
        largeDesktop: { min: "75.063em" }, // min: 1201px and above
      },
      fontFamily: {
        logoFonts: "Rubik Maps, system-ui;",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
