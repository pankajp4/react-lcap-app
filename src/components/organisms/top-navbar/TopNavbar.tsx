import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveForm } from "../../../features/builder/builderSlice";

import type { RootState } from "../../../features/store";
import styles from "./TopNavbar.module.css";

interface TopNavbarProps {
  onLogout?: () => void;
  onSettings?: () => void;
}

export const TopNavbar = ({ onLogout, onSettings }: TopNavbarProps) => {
  const dispatch = useDispatch();
  const { activeFormId, formSaving } = useSelector((state: RootState) => ({
    activeFormId: state.builder.activeFormId,
    formSaving: state.builder.formSaving,
  }));

  const handleSave = useCallback(() => {
    if (!activeFormId) return;
    dispatch(saveForm({ formId: activeFormId }));
  }, [dispatch, activeFormId]);

  return (
    <AppBar position="static" elevation={1} color="default">
      <Toolbar variant="dense" className={styles.toolbar}>
        <Typography variant="h6" component="h1">
          Form Builder
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!activeFormId || formSaving}
          >
            {formSaving ? "Saving..." : "Save"}
          </Button>
          {onSettings && (
            <IconButton
              color="default"
              onClick={onSettings}
              size="medium"
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>
          )}
          {onLogout && (
            <IconButton
              color="default"
              onClick={onLogout}
              size="medium"
              aria-label="logout"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
