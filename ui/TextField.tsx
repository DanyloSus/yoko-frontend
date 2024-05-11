// styled needs CSR
"use client";

// external imports
import localFont from "next/font/local";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import "./TextField.scss";

// get local kyiv font
const kyiv = localFont({
  src: "../public/fonts/KyivTypeSerif-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

// create custom textfield's style
const StyleForTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  // applying base style
  "& input": {
    padding: "16.5px 12px",
  },
  "& .MuiFormHelperText-root": {
    "&:first-letter": {
      textTransform: "uppercase",
    },
    whiteSpace: "nowrap",
  },

  "& .MuiInputBase-input.Mui-disabled": {
    color: "green",
  },

  // class for heading in create collection
  "&.font-kyiv": {
    "& *": {
      fontFamily: kyiv.style.fontFamily,
    },
    "& .MuiInputBase-input": {
      fontSize: "48px",
      lineHeight: "48px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "48px",
      "&.MuiInputLabel-shrink": {
        fontSize: "16px",
      },
    },
  },

  // applying style with primary color
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
        borderColor: "#FFCCCC",
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

import React from "react";

const StyledTextField = ({
  children,
  className,
  sx,
  ...props
}: TextFieldProps) => {
  return (
    <StyleForTextField
      {...props}
      className={className + " "}
      sx={{
        ...sx,
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "rgba(255,255,255,0.5)",
        },
      }}
    >
      {children}
    </StyleForTextField>
  );
};

export default StyledTextField;
