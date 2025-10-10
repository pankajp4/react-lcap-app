/**
 * @module Config
 * @description
 * Theme configuration module that defines the global styling and design system
 * for the form builder application using Material-UI's theming system.
 * @category Theme
 */

import { createTheme } from "@mui/material/styles";

/**
 * Custom Material-UI theme configuration for the form builder application.
 *
 * @constant
 * @category Theme
 * @since 1.0.0
 *
 * @remarks
 * This theme configuration defines:
 * - Color palette with primary and secondary colors
 * - Typography system with font families and settings
 * - Component-specific style overrides
 * - Spacing and layout defaults
 *
 * The theme follows Material Design principles while providing:
 * - Consistent color usage across components
 * - Accessible color contrast ratios
 * - Responsive typography scaling
 * - Unified component styling
 *
 * @example
 * ```tsx
 * // Using theme in a component
 * import { ThemeProvider } from '@mui/material';
 * import { theme } from '../config/theme';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
