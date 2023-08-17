import React from "react";
import { Box, Button, Dialog as MuiDialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const CADialog = ({ handleClose, handleDelete, openDialog, content }: any) => {
  return (
    <MuiDialog open={openDialog} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Accept</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default CADialog;
