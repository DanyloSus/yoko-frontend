// styled needs CSR
"use client";

// external imports
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";

// create custom tooltip's style
const StyleForTranslateTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  // applying base style
  maxWidth: 220,
  borderRadius: "8px",
}));

// custom component
const TranslateTooltip = ({ children, sx, ...props }: TooltipProps) => {
  // get user's theme
  const theme = useSelector((state: Store) => state.theme);
  // check is user's theme dark
  const isDark = theme === "dark";

  return (
    <StyleForTranslateTooltip
      {...props}
      sx={{
        ...sx,
        [`& .${tooltipClasses.tooltip}`]: isDark
          ? {
              backgroundColor: "#141301",
              border: "2px solid #626155",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.25)",
              color: "white",
            }
          : {
              backgroundColor: "#F0F0FD",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.25)",
              color: "black",
            },
        ["& .MuiTooltip-arrow "]: {
          textShadow: "0px 0px 4px rgba(0,0,0,0.25)",
          color: isDark ? "#626155" : "#F0F0FD", // arrow is span so we change its color
        },
      }}
    >
      {children}
    </StyleForTranslateTooltip>
  );
};

export default TranslateTooltip;
