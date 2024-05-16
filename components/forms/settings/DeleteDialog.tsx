"use client";

// external imports
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// internal imports
import StyledButton from "@/ui/Button";
import "./dialog.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import { logout } from "@/modules/redux/user/userSlice";
import { useRouter } from "@/modules/internationalization/navigation";

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
  const user = useSelector((state: Store) => state.user);

  // router for changing page by code
  const router = useRouter();

  // dispatch for slices' actions
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axios.patch(
        `http://18.212.227.5:8876/api/v1/users/${user.id}/blockOrUnblock`
      );

      await axios.post("/api/logout", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(logout());
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} className="">
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
        <StyledButton variant="contained" color="error" onClick={handleDelete}>
          {texts.delete}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
