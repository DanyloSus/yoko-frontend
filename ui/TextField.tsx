"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& input": {
    padding: "16.5px 12px",
  },

  "&.primary .MuiFormLabel-root": {
    color: "white",
  },
  "&.primary label.Mui-focused": {
    color: "white",
  },
  "&.primary .MuiInput-underline:after": {
    borderBottomColor: "#5640c2",
  },
  "&.primary input": {
    color: "white",
    padding: "16.5px 12px",
  },
  "&.primary .Mui-error": {
    color: "#FFCCCC",
    fieldset: {
      borderColor: "#FFCCCC !important",
    },
  },
  "&.primary .MuiOutlinedInput-root": {
    "&.primary fieldset": {
      borderColor: "#5640c2",
    },
    "&.primary:hover fieldset": {
      borderColor: "#5640c2",
    },
    "&.primary.Mui-focused fieldset": {
      borderColor: "#5640c2",
    },
  },
}));

export default StyledTextField;
