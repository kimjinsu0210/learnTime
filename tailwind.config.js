module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // added container option center
    container: {
      center: true
    },
    extend: {
      // added primary color red
      colors: {
        primary: "#DF0000",
        yellow: {
          450: "#FAD12E"
        }
      }
    }
  },
  plugins: []
};
