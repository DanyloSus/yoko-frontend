"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import localFont from "next/font/local";

const kyiv = localFont({
  src: "../public/fonts/KyivTypeSerif-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& input": {
    padding: "16.5px 12px",
  },
  "& .MuiFormHelperText-root": {
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },

  "&.font-kyiv": {
    "& *": { fontFamily: kyiv.style.fontFamily },
    "& .MuiOutlinedInput-root": {
      fontSize: "48px",
      lineHeight: "48px",
    },
  },

  "&.primary": {
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#5640c2",
    },
    "& input": {
      color: "white",
      padding: "16.5px 12px",
    },
    "& .Mui-error": {
      color: "#FFCCCC",
      fieldset: {
        borderColor: "#FFCCCC !important",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5640c2",
      },
      "&:hover fieldset": {
        borderColor: "#5640c2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5640c2",
      },
    },
  },
}));

export default StyledTextField;
