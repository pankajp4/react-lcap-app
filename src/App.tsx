/**
 * @module App
 * @description
 * Root application component for the Low Code Application Platform (LCAP).
 * Provides theme configuration, error boundaries, and core layout structure.
 * @category Core
 * @since 1.0.0
 *
 * @remarks
 * This component:
 * - Configures Material-UI dark theme
 * - Sets up error boundaries
 * - Provides notification system
 * - Renders main builder layout
 *
 * The component uses Material-UI's ThemeProvider to apply consistent styling
 * throughout the application, with a focus on dark mode for reduced eye strain
 * during extended development sessions.
 *
 * @example
 * ```tsx
 * // Usage in main.tsx
 * root.render(
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 * ```
 */

import { ThemeProvider, createTheme, Box, CssBaseline } from "@mui/material";
import React from "react";

import { ErrorBoundary, NotificationSystem } from "./components/atoms";
import { BuilderLayout } from "./components/organisms";

/**
 * Light theme configuration for the builder interface
 * @const
 * @type {import('@mui/material').Theme}
 *
 * @remarks
 * Customizes Material-UI's default light theme with:
 * - Custom primary color (#1976d2)
 * - Light background colors
 * - Paper surface colors
 */
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5",
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
  },
});

/**
 * Root application component providing theme and core structure
 * @component
 * @category Core
 * @since 1.0.0
 *
 * @remarks
 * App component responsibilities:
 * 1. Theme provider setup
 * 2. Root layout structure
 * 3. Error boundary configuration
 * 4. Notification system integration
 *
 * The component uses a full-height container to ensure
 * proper layout structure and theme color application.
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
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
