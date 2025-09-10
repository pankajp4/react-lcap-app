import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import type { RootState } from "../../../features/store";
import { hideNotification } from "../../../features/notification/notificationSlice";

export const NotificationSystem = () => {
  const dispatch = useDispatch();
  const { open, message, severity, duration } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, dispatch]);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
