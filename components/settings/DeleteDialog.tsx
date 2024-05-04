import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import StyledButton from "@/ui/Button";

type DialogTexts = {
  texts: {
    delete: string;
    dialogHeading: string;
    dialogContent: string;
    cancel: string;
  };
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DeleteDialog = (props: Props & DialogTexts) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <p className="text-h5 font-kyiv">{props.texts.dialogHeading}</p>
      </DialogTitle>
      <DialogContent>
        <p>{props.texts.dialogContent}</p>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="text" onClick={props.handleClose}>
          {props.texts.cancel}
        </StyledButton>
        <StyledButton variant="contained" color="error">
          {props.texts.delete}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
