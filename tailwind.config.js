// Colors stolen from Notion.so because I am not designer :(
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      secondary: {
        DEFAULT: "rgba(0, 129, 167)",
        light: "rgba(0, 129, 167, 0.8)",
      },
      accent: {
        DEFAULT: "rgba(55, 53, 47, 0.8)", // used for icon shit
        input: "rgb(247, 246, 243)",
        "hover-list": "rgb(55, 53, 47, 0.03)",
        "hover-icon": "rgb(55, 53, 47, 0.08)",
        sidebar: "rgb(247, 246, 243)",
      },
      textColor: {
        light: "rgba(25, 23, 17, 0.6)",
      },
      white: "white",
      gray: {
        100: "#F3F4F6",
        200: "#E5E7EB",
        400: "#9CA3AF",
        500: "#525967",
      },
    },
    extend: {
      borderColor: {
        DEFAULT: "rgb(55, 53, 47, 0.09)",
        test: "rgba(15, 15, 15, 0.1)",
      },
      transitionProperty: {
        left: "left",
        position: "position",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
