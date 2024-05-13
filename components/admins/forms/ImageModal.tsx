import StyledButton from "@/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import React from "react";

type DialogProps = {
  url: string;
  handleClose: () => void;
  open: boolean;
};

const ImageModal = (props: DialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} className="">
      <DialogTitle>
        <p className="text-h5 font-kyiv">Preview</p>
      </DialogTitle>
      <DialogContent>
        <Image
          src={props.url}
          width={200}
          height={200}
          alt="Preview Image"
          className="w-[200px] h-[200px] object-cover object-center"
        />
      </DialogContent>
      <DialogActions>
        <StyledButton variant="text" onClick={props.handleClose}>
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
