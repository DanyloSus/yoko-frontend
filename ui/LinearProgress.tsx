// styled needs CSR
"use client";

// external imports
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

// create custom LinearProgress's style
const StyleForLinearProgress = styled(LinearProgress)<LinearProgressProps>(
  ({ theme }) => ({
    // applying base style
    "&": {
      height: "10px",
      borderRadius: "999px",
    },
  })
);

import React from "react";

const StyledLinearProgress = ({ ...props }: LinearProgressProps) => {
  return <StyleForLinearProgress {...props} />;
};

export default StyledLinearProgress;
