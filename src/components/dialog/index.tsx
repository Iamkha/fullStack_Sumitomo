import * as React from "react";
import { Button, Dialog as MuiDialog, Typography } from "@mui/material";

const Dialog = ({ label = "Open Dialog", children, ...rest }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className="bg-blue-500" onClick={handleClick}>
        {label}
      </Button>
      <MuiDialog open={open} onClose={handleClose} {...rest}>
        {React.cloneElement(children, { handleClose })}
      </MuiDialog>
    </div>
  );
};

export default Dialog;
