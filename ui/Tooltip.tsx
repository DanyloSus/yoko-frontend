// styled needs CSR
"use client";

import { Store } from "@/modules/redux/store";
// external imports
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

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

import React from "react";
import { useSelector } from "react-redux";

const TranslateTooltip = ({ children, sx, ...props }: TooltipProps) => {
  const theme = useSelector((state: Store) => state.theme);
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
