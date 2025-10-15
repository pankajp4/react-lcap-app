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
import styles from "./styles.module.css";

/**
 * TopBar component
 * @description
 * Header bar for the UI builder interface.
 */
export const TopBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.topBar}>{children}</div>;

/**
 * Button component
 * @description
 * Primary button component with hover and disabled states.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);

/**
 * ButtonGroup component
 * @description
 * Container for grouping multiple buttons together.
 */
export const ButtonGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.buttonGroup}>{children}</div>;
