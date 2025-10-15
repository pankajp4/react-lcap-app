import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NotificationSystem } from "@atoms/notification-system/NotificationSystem";
import notificationReducer, {
  showNotification,
  hideNotification,
} from "@store/notification/notificationSlice";

// Mock CSS module
vi.mock("@atoms/notification-system/NotificationSystem.module.css", () => ({
  default: {
    snackbar: "snackbar",
  },
}));

describe("NotificationSystem", () => {
  const createTestStore = (initialState = {}) =>
    configureStore({
      reducer: {
        notification: notificationReducer,
      },
      preloadedState: {
        notification: {
          message: "",
          severity: "info" as "info" | "success" | "warning" | "error",
          open: false,
          ...initialState,
        },
      },
    });

  it("renders nothing when there is no notification", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders success notification", () => {
    const store = createTestStore({
      message: "Success message",
      severity: "success",
      open: true,
    });

    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");
  });

  it("renders error notification", () => {
    const store = createTestStore({
      message: "Error message",
      severity: "error",
      open: true,
    });

    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledError");
  });

  it("closes notification on close button click", () => {
    const store = createTestStore({
      message: "Test message",
      severity: "info",
      open: true,
    });

    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    const closeButton = screen.getByTitle("Close");
    fireEvent.click(closeButton);

    expect((store.getState() as any).notification.open).toBe(false);
  });

  it("auto-closes notification after timeout", async () => {
    vi.useFakeTimers();
    const store = createTestStore({
      message: "Auto-close test",
      severity: "info",
      open: true,
    });

    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    expect(screen.getByText("Auto-close test")).toBeInTheDocument();

    vi.advanceTimersByTime(6000);
    await Promise.resolve(); // Wait for state updates

    expect((store.getState() as any).notification.open).toBe(false);
    vi.useRealTimers();
  });

  it("updates notification when state changes", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    );

    // Initially no notification
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Show notification
    store.dispatch(
      showNotification({ message: "New message", severity: "warning" })
    );
    await screen.findByText("New message");

    // Hide notification
    store.dispatch(hideNotification());
    expect((store.getState() as any).notification.open).toBe(false);
  });
});
