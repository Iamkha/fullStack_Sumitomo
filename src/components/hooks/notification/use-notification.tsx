import { useSnackbar, VariantType } from "notistack";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button } from "@mui/material";
import Notification from "@/components/notification";

interface Notification {
  title: string;
  messages?: string[];
  type: VariantType;
}

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = (notification: Notification) => {
    enqueueSnackbar(<Notification {...notification} />, {
      variant: notification.type,
      autoHideDuration: 5000,
      action: (snackbarKey) => (
        <Box>
          <Button onClick={() => closeSnackbar(snackbarKey)}>
            <ClearIcon className="text-gray-50" />
          </Button>
        </Box>
      ),
    });
  };

  return { showNotification };
};
