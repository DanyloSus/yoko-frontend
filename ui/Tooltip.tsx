import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const TranslateTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  maxWidth: 220,
  borderRadius: "8px",
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F0F0FD",
    boxShadow: "0px 0px 4px rgba(0,0,0,0.25)",
    color: "black",
  },
  ["& .MuiTooltip-arrow "]: {
    boxShadow: "0px 0px 4px rgba(0,0,0,0.25)",
    color: "#F0F0FD",
  },
}));

export default TranslateTooltip;
