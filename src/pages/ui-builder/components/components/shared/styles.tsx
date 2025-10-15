/**
 * @fileoverview
 * Shared styled components for UI Builder.
 * Provides reusable UI elements with consistent styling.
 *
 * @module Pages/UIBuilder/Components/Styles
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import {
  Box,
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
} from "@mui/material";

/**
 * TopBar component
 * @description
 * Header bar for the UI builder interface.
 */
export const TopBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      padding: "16px 24px",
      backgroundColor: "#34495e",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      color: "#ffffff",
    }}
  >
    {children}
  </Box>
);

/**
 * Button component
 * @description
 * Primary button component with hover and disabled states.
 */
interface ButtonProps extends React.ComponentProps<typeof MuiButton> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <MuiButton
    variant="contained"
    sx={{
      backgroundColor: "#42a5f5",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      "&:disabled": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "rgba(255, 255, 255, 0.5)",
      },
    }}
    {...props}
  >
    {children}
  </MuiButton>
);

/**
 * ButtonGroup component
 * @description
 * Container for grouping multiple buttons together.
 */
export const ButtonGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <MuiButtonGroup sx={{ gap: 1 }}>{children}</MuiButtonGroup>;
