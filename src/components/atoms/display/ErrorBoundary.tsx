import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
    // Here you can log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper
          sx={{
            p: 3,
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <Box
              component="pre"
              sx={{
                maxHeight: 200,
                overflow: "auto",
                bgcolor: "grey.100",
                p: 2,
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {this.state.errorInfo.componentStack}
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={this.handleReset}
          >
            Try Again
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}
