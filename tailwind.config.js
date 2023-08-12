module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // added container option center
    container: {
      center: true
    },
    extend: {
      // added color code
      colors: {
        primary: "#A41212", // 포인트컬러 레드
        mainDark3: "#2A2929", // 젤 밝은거
        mainDark2: "#1C1C1C", // 중간 어두운거
        mainDark1: "#010409" //제일 어두운거
      }
    }
  },
  plugins: []
};
