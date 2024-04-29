import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    //custom colors
    colors: {
      "blue-marguerite": {
        "50": "#eff2fe",
        "100": "#e2e6fd",
        "200": "#cad0fb",
        "300": "#aab0f7",
        "400": "#8888f1",
        "500": "#6d64e8",
        "600": "#644fdc",
        "700": "#5640c2",
        "800": "#46369d",
        "900": "#3c337c",
        "950": "#241e48",
      },
      black: "141301",
      white: "FFFBFC",
      grey: "626155",
    },
    //custom fonts
    fontFamily: {
      kyiv: ["var(--font-kyiv)"],
      dmSans: ["var(--font-dm-sans)"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
