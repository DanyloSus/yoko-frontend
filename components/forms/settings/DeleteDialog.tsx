// external imports
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// internal imports
import StyledButton from "@/ui/Button";

type Texts = {
  texts: {
    delete: string;
    dialogHeading: string;
    dialogContent: string;
    cancel: string;
  };
};

type DialogProps = {
  open: boolean;
  handleClose: () => void;
};

const DeleteDialog = ({ texts, ...props }: DialogProps & Texts) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <p className="text-h5 font-kyiv">{texts.dialogHeading}</p>
      </DialogTitle>
      <DialogContent>
        <p>{texts.dialogContent}</p>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="text" onClick={props.handleClose}>
          {texts.cancel}
        </StyledButton>
        <StyledButton variant="contained" color="error">
          {texts.delete}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
