import { Box, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { ErrorBoundary, NotificationSystem } from "./components/atoms";
import BuilderLayout from "./components/organisms/BuilderLayout/BuilderLayout";

// Create a dark theme for the builder
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <ErrorBoundary>
          <NotificationSystem />
          <BuilderLayout />
        </ErrorBoundary>
      </Box>
    </ThemeProvider>
  );
};

export default App;
