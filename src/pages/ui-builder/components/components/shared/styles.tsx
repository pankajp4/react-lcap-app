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
import styles from "./styles.module.css";

/**
 * TopBar component
 * @description
 * Header bar for the UI builder interface.
 */
export const TopBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Box className={styles.topBar}>{children}</Box>;

/**
 * Button component
 * @description
 * Primary button component with hover and disabled states.
 */
interface ButtonProps extends React.ComponentProps<typeof MuiButton> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <MuiButton variant="contained" className={styles.button} {...props}>
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
}) => (
  <MuiButtonGroup className={styles.buttonGroup}>{children}</MuiButtonGroup>
);
