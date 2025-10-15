/**
 * @module Atoms
 * @description Global notification system component for displaying alerts and messages
 * @category Feedback
 */

import { Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { hideNotification } from "../../../store/notification/notificationSlice";
import styles from "./NotificationSystem.module.css";

/**
 * A component that provides a global notification system using Material-UI's Snackbar
 * and Alert components. It connects to Redux to manage notification state.
 *
 * @component
 * @category Components
 *
 * @remarks
 * This component does not accept any props as it manages its state entirely through
 * Redux. To show notifications, dispatch actions from the notification slice.
 *
 * @example
 * ```tsx
 * // In your app's root component:
 * <NotificationSystem />
 *
 * // To show a notification from anywhere in your app:
 * dispatch(showNotification({ message: "Success!", severity: "success" }));
 * ```
 */
export const NotificationSystem = () => {
  /** Redux dispatch function */
  const dispatch = useDispatch();

  /**
   * Select notification state from Redux store
   * @type {Object}
   * @property {string} message - The notification message to display
   * @property {'success' | 'info' | 'warning' | 'error'} severity - The type of notification
   * @property {boolean} open - Whether the notification is visible
   */
  const { message, severity, open } = useSelector(
    (state: RootState) => state.notification
  );

  /**
   * Handles closing the notification
   * Dispatches hideNotification action to Redux
   */
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
