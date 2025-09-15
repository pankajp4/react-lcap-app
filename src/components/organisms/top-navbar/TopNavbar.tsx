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

interface TopNavbarProps {
  onLogout?: () => void;
  onSettings?: () => void;
  onPreview?: () => void;
  userName?: string;
  userAvatar?: string;
}

export const TopNavbar = ({
  onLogout,
  onSettings,
  onPreview,
  userName = "User",
  userAvatar = "https://via.placeholder.com/40",
}: TopNavbarProps) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { activeFormId, formSaving } = useSelector((state: RootState) => ({
    activeFormId: state.builder.activeFormId,
    formSaving: state.builder.formSaving,
  }));

  const handleSave = useCallback(() => {
    if (!activeFormId) return;
    dispatch(saveForm({ formId: activeFormId }));
  }, [dispatch, activeFormId]);

  const handleUndo = useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(redo());
  }, [dispatch]);

  const handleUserMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleUserMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
