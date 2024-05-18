// styled needs CSR
"use client";

// external imports
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import localFont from "next/font/local";

// get local kyiv font
const kyiv = localFont({
  src: "../../public/fonts/KyivTypeSerif-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

// create custom textfield's style
const StyleForTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
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
}));

// custom component
const StyledTextField = ({
  children,
  className,
  sx,
  ...props
}: TextFieldProps) => {
  return (
    <StyleForTextField
      {...props}
      className={className + " dark:text-white dark:border-dark-grey"}
      sx={{
        ...sx,
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "rgb(127,127,127)",
        },
      }}
    >
      {children}
    </StyleForTextField>
  );
};

export default StyledTextField;
