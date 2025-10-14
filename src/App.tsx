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

import { Box, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { ErrorBoundary, NotificationSystem } from "./components/atoms";
import { BuilderLayout } from "./components/organisms";

/**
 * Dark theme configuration for the builder interface
 * @const
 * @type {import('@mui/material').Theme}
 *
 * @remarks
 * Customizes Material-UI's default dark theme with:
 * - Custom primary color (#90caf9)
 * - Dark background colors
 * - Paper surface colors
 */
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
 * The component uses a full-height Box component to ensure
 * proper layout structure and theme color application.
 */
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
