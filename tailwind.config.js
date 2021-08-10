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
      white: "white",
      gray: {
        100: "#F3F4F6",
        200: "#E5E7EB",
        400: "#9CA3AF",
        500: "#525967",
      },
    },
    textColor: {
      primary: "rgba(55, 53, 47)",
      secondary: "rgba(0, 108, 140)",
      light: "rgba(25, 23, 17, 0.6)",
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
      boxShadow: {
        test: "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgb(48, 48, 48, 0.2) 0px 9px 24px",
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
