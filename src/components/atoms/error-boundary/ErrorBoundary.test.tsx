import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { ErrorBoundary } from "@atoms/error-boundary/ErrorBoundary";

// Mock console.error to prevent logging during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Mock CSS module
vi.mock("@atoms/error-boundary/ErrorBoundary.module.css", () => ({
  default: {
    errorContainer: "errorContainer",
  },
}));

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    const ThrowingComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Error details")).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it("logs error information to console", () => {
    const error = new Error("Test error");
    const ThrowingComponent = () => {
      throw error;
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error caught by ErrorBoundary:",
      error,
      expect.any(Object)
    );
  });

  it("resets error state when remounted", () => {
    const ThrowingComponent = () => {
      throw new Error("Test error");
    };

    const { unmount } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

    unmount();

    render(
      <ErrorBoundary>
        <div>New Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("New Content")).toBeInTheDocument();
  });

  it("handles nested errors", () => {
    const NestedThrowingComponent = () => {
      throw new Error("Nested error");
    };

    const ParentComponent = () => (
      <div>
        <NestedThrowingComponent />
      </div>
    );

    render(
      <ErrorBoundary>
        <ParentComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText(/Nested error/)).toBeInTheDocument();
  });
});
