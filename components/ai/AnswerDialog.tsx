// external imports
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// internal imports
import StyledButton from "@/ui/Button";

// type Texts = {
//   texts: {
//     delete: string;
//     dialogHeading: string;
//     dialogContent: string;
//     cancel: string;
//   };
// };

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  level: string;
};

const AnswerDialog = ({ ...props }: DialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <p className="text-h5 font-kyiv">Your Result</p>
      </DialogTitle>
      <DialogContent>
        <p>You have {props.level} level</p>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="contained">Great!</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AnswerDialog;
