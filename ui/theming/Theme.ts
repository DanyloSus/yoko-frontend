import { dmSans } from "@/app/layout";
import { createTheme } from "@mui/material";

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
