// external imports
import { createTheme } from "@mui/material";
import { DM_Sans } from "next/font/google";

// get google font, DM Sans
const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

// create custom style for all site
const theme = createTheme({
  // set colors
  palette: {
    primary: {
      main: "#6d64e8",
    },
    secondary: {
      main: "#6d64e8",
    },
  },
  typography: {
    // set main fonts
    fontFamily: dmSans.style.fontFamily + ", sans-serif",
  },
});

export default theme;
