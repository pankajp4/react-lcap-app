/**
 * @module Features/Notification
 * @description
 * Redux slice for managing global notifications and alerts in the application.
 * Provides actions and state for displaying temporary messages to users.
 * @category State Management
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface defining the notification state structure
 * @interface
 * @category State
 * @since 1.0.0
 *
 * @remarks
 * The notification state manages:
 * - Visibility of notifications
 * - Message content
 * - Severity level
 * - Display duration
 *
 * Notifications can be used for:
 * - Success messages
 * - Error alerts
 * - Information updates
 * - Warning messages
 */
export interface NotificationState {
  /** Whether the notification is currently visible */
  open: boolean;
  /** The message text to display */
  message: string;
  /** The severity level of the notification */
  severity: "success" | "error" | "info" | "warning";
  /** Duration in milliseconds to display the notification */
  duration?: number;
}

/**
 * Initial state for the notification slice
 * @constant
 * @category State
 *
 * @remarks
 * Default configuration:
 * - Hidden notification
 * - Empty message
 * - Info severity
 * - 6-second duration
 */
const initialState: NotificationState = {
  open: false,
  message: "",
  severity: "info",
  duration: 6000, // default duration in milliseconds
};

/**
 * Redux slice for notification management
 * @constant
 * @category Redux
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * // Show a success notification
 * dispatch(showNotification({
 *   message: "Form saved successfully",
 *   severity: "success"
 * }));
 *
 * // Show an error notification with custom duration
 * dispatch(showNotification({
 *   message: "Failed to save form",
 *   severity: "error",
 *   duration: 10000 // 10 seconds
 * }));
 *
 * // Hide current notification
 * dispatch(hideNotification());
 * ```
 */
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    /**
     * Shows a notification with the specified configuration
     * @param state - Current notification state
     * @param action - Notification configuration payload
     */
    showNotification: (
      state,
      action: PayloadAction<Omit<NotificationState, "open">>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.duration = action.payload.duration ?? 6000;
    },

    /**
     * Hides the currently displayed notification
     * @param state - Current notification state
     */
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
