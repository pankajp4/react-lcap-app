import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  duration?: number;
}

const initialState: NotificationState = {
  open: false,
  message: "",
  severity: "info",
  duration: 6000, // default duration
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<Omit<NotificationState, "open">>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.duration = action.payload.duration ?? 6000;
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
