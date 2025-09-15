import { Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../features/store";
import { hideNotification } from "../../../features/notification/notificationSlice";
import styles from "./NotificationSystem.module.css";

export const NotificationSystem = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector(
    (state: RootState) => state.notification
  );

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className={styles.snackbar}
    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
