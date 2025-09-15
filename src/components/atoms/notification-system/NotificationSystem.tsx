import { Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../features/store";
import { hideNotification } from "../../../features/notification/notificationSlice";
import styles from "./NotificationSystem.module.css";

export const NotificationSystem = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector(
    (state: RootState) => state.notification
  );

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className={styles.snackbar}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
