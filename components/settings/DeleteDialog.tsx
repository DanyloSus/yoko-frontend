import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import StyledButton from "@/ui/Button";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DeleteDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <h3 className="text-h5">Are you sure?</h3>
      </DialogTitle>
      <DialogContent>
        <p>If you delete your account you will lost all your progress.</p>
      </DialogContent>
      <DialogActions>
        <StyledButton variant="text" onClick={props.handleClose}>
          Cancel
        </StyledButton>
        <StyledButton variant="contained" color="error">
          Delete
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
