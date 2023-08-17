import * as React from "react";

import Button from "@mui/material/Button";
import { Box, Dialog as MuiDialog } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { pink } from "@mui/material/colors";
import _map from "lodash/map";
import _size from "lodash/size";
import _get from "lodash/get";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNotification } from "@/components/hooks/notification/use-notification";
import CADialog from "@/components/dialog/confirm-dialog";
import Register from "@/components/form/register";
import axios from "axios";
import Cookies from "js-cookie";

const ButtonFormat = ({ row }: any) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const info = useSelector((state: RootState) => state.user.userInfo);

  // const request = getRequest();
  const { showNotification } = useNotification();

  const check: any = (row: any) => {
    if (info?.roles[0] == "superadmin") {
      return true;
    }
    if (info?.roles[0] == "user" && row.email == info?.email) {
      return true;
    }
    if (info?.roles[0] == "admin" && row.roles[0] == "user") {
      return true;
    }
    if (info?.roles[0] == "admin" && row.email == info?.email) {
      return true;
    }
    return false;
  };
  const handleClick = (row: any, action: any) => {
    if (action == "Delete") {
      setOpenDialog(true);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };
  const handleDelete = () => {
    setTimeout(() => {
      axios("/api/v1/user" + "/" + row._id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        method: "DELETE",
      })
        .then((res: any) => {
          window.location.reload();
          handleClose();
        })
        .catch((e) => {
          showNotification({
            title: e?.response?.data?.message,
            type: "error",
          });
        });
      // request.delete(USER_ENDPOINT + "/" + row._id).then((res: any) => {
      //   if (!res.data.error) {
      //     window.location.reload();
      //     handleClose();
      //   } else {
      //     showNotification({
      //       title: res.data.error,
      //       type: "error",
      //     });
      //   }
      // });
    }, 400);
  };
  const action =
    _get(row, "action") &&
    Array.isArray(_get(row, "action", [])) &&
    _size(_get(row, "action")) > 0 &&
    _map(_get(row, "action"), (action: any, index: any) => {
      if (action == "Delete" && row.email == info?.email) {
        return <div key={index}></div>;
      }
      if (action == "Edit") {
        return (
          <Button
            key={index}
            onClick={() => handleClick(row, action)}
            disabled={!check(row)}
          >
            <EditIcon />
          </Button>
        );
      }
      if (action == "Delete") {
        return (
          <Button
            key={index}
            onClick={() => handleClick(row, action)}
            disabled={!check(row)}
          >
            <DeleteForeverIcon sx={check(row) ? { color: pink[500] } : {}} />
          </Button>
        );
      }
    });
  return (
    <Box>
      {openDialog ? (
        <CADialog
          handleClose={handleClose}
          handleDelete={handleDelete}
          openDialog={openDialog}
          content="Do you really want to delete this account?"
        />
      ) : (
        <></>
      )}
      {action}
      {row != "" ? (
        <MuiDialog open={open} onClose={handleClose}>
          <Register infos={row} />
        </MuiDialog>
      ) : (
        <> </>
      )}
    </Box>
  );
};

export default ButtonFormat;
