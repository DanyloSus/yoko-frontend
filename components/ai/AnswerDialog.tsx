// external imports
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// internal imports
import StyledButton from "@/ui/Button";
import { Link } from "@/modules/internationalization/navigation";

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
    <Dialog open={props.open}>
      <DialogTitle>
        <p className="text-h5 font-kyiv">Your Result</p>
      </DialogTitle>
      <DialogContent>
        <p>You have {props.level} level</p>
      </DialogContent>
      <DialogActions>
        <Link href="/login">
          <StyledButton variant="contained">Login</StyledButton>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default AnswerDialog;
