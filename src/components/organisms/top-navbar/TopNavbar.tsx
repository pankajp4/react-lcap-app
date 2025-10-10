/**
 * @module Organisms
 * @description Navigation component that provides access to core form builder functionality
 * @category UI Components
 */

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import UndoIcon from "@mui/icons-material/Undo";
import PreviewIcon from "@mui/icons-material/Visibility";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveForm } from "../../../features/builder/builderSlice";
import { redo, undo } from "../../../features/builder/historySlice";

import type { RootState } from "../../../features/store";
import styles from "./TopNavbar.module.css";

/**
 * Props for the TopNavbar component
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * All callback functions are optional to allow flexibility in usage.
 * Default values are provided for userName and userAvatar when not specified.
 */
interface TopNavbarProps {
  /**
   * Callback function when user clicks logout
   * @callback
   */
  onLogout?: () => void;

  /**
   * Callback function when user clicks settings
   * @callback
   */
  onSettings?: () => void;

  /**
   * Callback function when user clicks preview
   * @callback
   */
  onPreview?: () => void;

  /**
   * Display name of the current user
   * @defaultValue "User"
   */
  userName?: string;

  /**
   * URL of the user's avatar image
   * @defaultValue "https://via.placeholder.com/40"
   */
  userAvatar?: string;
}

/**
 * Top navigation bar component providing form builder controls and user actions.
 *
 * @component
 * @category Components
 * @subcategory Navigation
 *
 * @remarks
 * This component provides:
 * - Form actions (save, undo, redo)
 * - Form search functionality
 * - Preview mode toggle
 * - User settings and logout
 * - Loading state feedback
 *
 * The navbar integrates with Redux for form state management and
 * history operations.
 *
 * @example
 * ```tsx
 * <TopNavbar
 *   userName="John Doe"
 *   userAvatar="/path/to/avatar.jpg"
 *   onLogout={() => handleLogout()}
 *   onSettings={() => openSettings()}
 *   onPreview={() => showPreview()}
 * />
 * ```
 */
export const TopNavbar = ({
  onLogout,
  onSettings,
  onPreview,
  userName = "User",
  userAvatar = "https://via.placeholder.com/40",
}: TopNavbarProps) => {
  const dispatch = useDispatch();

  /** State for search input value */
  const [searchQuery, setSearchQuery] = useState("");
  /** State for user menu anchor element */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  /** Derived state for menu open status */
  const open = Boolean(anchorEl);

  /**
   * Select active form state from Redux
   * Includes form ID and saving status
   */
  const { activeFormId, formSaving } = useSelector((state: RootState) => ({
    activeFormId: state.builder.activeFormId,
    formSaving: state.builder.formSaving,
  }));

  /**
   * Handle form save action
   * Dispatches save action to Redux if a form is active
   */
  /**
   * Handles saving the current form state
   * @remarks
   * Only executes if there is an active form ID
   * Dispatches the saveForm action to persist form data
   */
  const handleSave = useCallback(() => {
    if (!activeFormId) return;
    dispatch(saveForm({ formId: activeFormId }));
  }, [dispatch, activeFormId]);

  /**
   * Handles undo action in the form builder
   * @remarks
   * Dispatches undo action to history slice to revert last change
   */
  const handleUndo = useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  /**
   * Handles redo action in the form builder
   * @remarks
   * Dispatches redo action to history slice to reapply previously undone change
   */
  const handleRedo = useCallback(() => {
    dispatch(redo());
  }, [dispatch]);

  /**
   * Handles opening the user menu
   * @param event - The click event from the menu trigger element
   */
  const handleUserMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  /**
   * Handles closing the user menu
   * @remarks
   * Resets the anchor element to close the menu
   */
  const handleUserMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  /**
   * Handles changes to the search input
   * @param event - The change event from the search input field
   * @remarks
   * Updates the search query state with the new input value
   */
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  return (
    <AppBar position="static" elevation={1} color="default">
      <Toolbar variant="dense" className={styles.toolbar}>
        {/* Left Section */}
        <Box
          component="div"
          className={styles.homeLink}
          onClick={() => (window.location.href = "/")}
        >
          <Typography variant="h6" component="h1">
            Form Builder
          </Typography>
        </Box>

        {/* Center Section */}
        <Box className={styles.centerSection}>
          <IconButton onClick={handleUndo} size="medium" aria-label="undo">
            <UndoIcon />
          </IconButton>
          <IconButton onClick={handleRedo} size="medium" aria-label="redo">
            <RedoIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!activeFormId || formSaving}
            startIcon={<SaveIcon />}
          >
            {formSaving ? "Saving..." : "Save"}
          </Button>
          {onPreview && (
            <IconButton onClick={onPreview} size="medium" aria-label="preview">
              <PreviewIcon />
            </IconButton>
          )}
          <div className={styles.searchContainer}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
        </Box>

        {/* Right Section */}
        <Box>
          <IconButton
            onClick={handleUserMenuClick}
            size="medium"
            aria-label="user menu"
          >
            <Avatar
              src={userAvatar}
              alt={userName}
              className={styles.userAvatar}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
          >
            {onSettings && (
              <MenuItem onClick={onSettings} className={styles.menuItem}>
                <SettingsIcon /> Settings
              </MenuItem>
            )}
            {onLogout && (
              <MenuItem onClick={onLogout} className={styles.menuItem}>
                <LogoutIcon /> Logout
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
