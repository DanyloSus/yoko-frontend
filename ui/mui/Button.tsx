// styled needs CSR
"use client";

// external imports
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// create custom button's style
const StyleForButton = styled(Button)<ButtonProps>(({ theme }) => ({
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
  "&:active": {
    boxShadow: "none",
  },
}));

// custom component
const StyledButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <StyleForButton
      {...props}
      className={className + " dark:text-white dark:border-dark-grey"}
    >
      {children}
    </StyleForButton>
  );
};

export default StyledButton;
