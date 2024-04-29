"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
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
}));

export default StyledTextField;
