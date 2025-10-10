/**
 * @module Main
 * @description
 * Application entry point that sets up the React runtime environment
 * with Redux store, Material-UI baseline CSS, and global styles.
 * @category Core
 * @since 1.0.0
 *
 * @remarks
 * This module:
 * - Initializes React 18 with createRoot
 * - Sets up Redux store provider
 * - Configures Material-UI baseline styles
 * - Includes global CSS
 * - Enables React Strict Mode
 *
 * The setup ensures:
 * - Proper React 18 concurrent features
 * - Global state management
 * - Consistent base styling
 * - Development safety checks
 */

import { CssBaseline } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./features/store";
import "./styles/globals.css";

/**
 * Root DOM element where the React application will be mounted
 * @const
 * @throws {Error} When root element is not found in the DOM
 */
const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

/**
 * React 18 root instance for concurrent rendering
 * @const
 * @type {import('react-dom/client').Root}
 */
const root = createRoot(container);

/**
 * Render the application with required providers and configuration
 * @remarks
 * The render setup includes:
 * 1. React Strict Mode for development checks
 * 2. Redux store provider for state management
 * 3. Material-UI CssBaseline for consistent styling
 * 4. Root App component
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
);
