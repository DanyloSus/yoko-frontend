import { createTheme } from "@mui/material";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d64e8",
    },
    error: {
      main: "#FFCCCC",
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
});

export default theme;
