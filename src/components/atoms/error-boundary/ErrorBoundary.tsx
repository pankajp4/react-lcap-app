/**
 * @module Atoms
 * @description Error boundary component for catching and handling React rendering errors
 * @category Error Handling
 */

import { Component, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";

/**
 * Props for the ErrorBoundary component
 * @interface
 * @category Props
 */
interface Props {
  /** React child elements to be rendered within the error boundary */
  children: ReactNode;
}

/**
 * State interface for the ErrorBoundary component
 * @interface
 * @category State
 */
interface State {
  /** Indicates whether an error has occurred */
  hasError: boolean;
  /** The error object if an error occurred */
  error?: Error;
}

/**
 * A class component that catches JavaScript errors anywhere in its child component tree
 * and displays a fallback UI instead of the component tree that crashed.
 *
 * @component
 * @extends {Component<Props, State>}
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  /**
   * Creates an instance of ErrorBoundary.
   * @param {Props} props - Component props
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method called when an error occurs during rendering.
   * Used to update the component's state based on the caught error.
   *
   * @param {Error} error - The error that was thrown
   * @returns {State} New state object with error information
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error has been thrown by a descendant component.
   * Used for error logging and analytics.
   *
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Component stack trace information
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  /**
   * Renders either the error UI when an error occurs or the children when no error is present.
   *
   * @returns {ReactNode} The rendered content
   */
  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            padding: 2,
            margin: 2,
            border: "1px solid #ff5252",
            borderRadius: 1,
            backgroundColor: "#ffebee",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#d32f2f",
              marginTop: 0,
            }}
          >
            Something went wrong.
          </Typography>
          <details style={{ marginTop: "8px" }}>
            <summary style={{ cursor: "pointer", color: "#d32f2f" }}>
              Error details
            </summary>
            <Box
              component="pre"
              sx={{
                marginTop: 1,
                padding: 1,
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 0.5,
                overflow: "auto",
                fontSize: "0.875rem",
                fontFamily: "monospace",
              }}
            >
              {this.state.error?.toString()}
            </Box>
          </details>
        </Box>
      );
    }

    return this.props.children;
  }
}
