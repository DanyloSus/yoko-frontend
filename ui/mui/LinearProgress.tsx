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

// custom component
const StyledLinearProgress = ({ ...props }: LinearProgressProps) => {
  return (
    <div className="relative mt-3 w-full">
      <StyleForLinearProgress {...props} variant="determinate" />
      <p className="text-label text-white absolute top-1/2 left-1/2 -translate-x-1/2 font-bold -translate-y-1/2 [text-shadow:0px_0px_4px_#000] ">
        {props.value}
      </p>
    </div>
  );
};

export default StyledLinearProgress;
