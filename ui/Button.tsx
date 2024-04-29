"use client";

import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  boxShadow: "none",
  padding: "10px 20px",
  borderRadius: "999px",
  fontSize: "16px",
  textTransform: "capitalize",
  height: "41px",
}));

export default StyledButton;
