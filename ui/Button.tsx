// styled needs CSR
"use client";

// external imports
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// create custom button's style
const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // applying base style
  boxShadow: "none",
  padding: "10px 20px",
  borderRadius: "999px",
  fontSize: "16px",
  textTransform: "capitalize",
  height: "41px",
  minWidth: "0px",

  "&:hover": {
    boxShadow: "none",
  },
}));

export default StyledButton;
