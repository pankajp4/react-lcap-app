import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PreviewIcon from "@mui/icons-material/Preview";
import PublishIcon from "@mui/icons-material/Publish";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import UndoIcon from "@mui/icons-material/Undo";
import {
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../features/store";
import store from "../../../features/store";
import { FormService } from "../../../services/FormService";
import { HistoryService } from "../../../services/HistoryService";
import { addToHistory } from "../../../features/builder/historySlice";
import { useApiCall } from "../../../utils/hooks/useApiCall";
import { ErrorBoundary } from "../../atoms/display/ErrorBoundary";
import api from "../../../config/api";
import styles from "./TopNavbar.module.css";

interface Props {
  onLogout: () => void;
  onSettings: () => void;
}

const formService = new FormService(
  api.defaults.baseURL || "http://localhost:3000"
);

export const TopNavbar = ({ onLogout, onSettings }: Props) => {
  const dispatch = useDispatch();
  const getState = useCallback((): RootState => store.getState(), []);
  const historyService = useMemo(
    () => new HistoryService(dispatch, getState),
    [dispatch, getState]
  );

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const activeForm = useSelector((state: RootState) => {
    const activeFormId = state.builder.activeFormId;
    return activeFormId
      ? state.builder.forms.find((f) => f.id === activeFormId)
      : null;
  });

  const isLoading = useSelector((state: RootState) => ({
    save: state.loading["saveForm"],
    preview: state.loading["previewForm"],
    publish: state.loading["publishForm"],
  }));

  const saveForm = useApiCall({
    loadingKey: "saveForm",
    successMessage: "Form saved successfully",
    errorMessage: "Failed to save form",
  });

  const previewForm = useApiCall({
    loadingKey: "previewForm",
    errorMessage: "Failed to generate preview",
  });

  const publishForm = useApiCall({
    loadingKey: "publishForm",
    successMessage: "Form published successfully",
    errorMessage: "Failed to publish form",
  });

  const handleSave = useCallback(async () => {
    if (!activeForm) return;
    await saveForm(
      () => formService.saveForm(activeForm),
      () => dispatch(addToHistory(activeForm))
    );
  }, [activeForm, dispatch, saveForm]);

  const handlePreview = useCallback(async () => {
    if (!activeForm) return;
    await previewForm(async () => {
      const url = await formService.generatePreview(activeForm);
      window.open(url, "_blank");
      return url;
    });
  }, [activeForm, previewForm]);

  const handlePublish = useCallback(async () => {
    if (!activeForm) return;
    await publishForm(() => formService.publishForm(activeForm));
  }, [activeForm, publishForm]);

  const handleUndo = useCallback(() => {
    historyService.undo();
  }, [historyService]);

  const handleRedo = useCallback(() => {
    historyService.redo();
  }, [historyService]);

  const handleLogout = useCallback(() => {
    onLogout();
    setUserMenuAnchor(null);
  }, [onLogout]);

  const handleSettings = useCallback(() => {
    onSettings();
    setUserMenuAnchor(null);
  }, [onSettings]);

  const canUndo = historyService.canUndo();
  const canRedo = historyService.canRedo();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src="/logo.svg" alt="LCAP" className={styles.logo} />
        <h1 className={styles.title}>Low-Code Application Platform</h1>
      </div>

      <ErrorBoundary>
        <div className={styles.actions}>
          <Tooltip title="Save">
            <span>
              <IconButton
                onClick={handleSave}
                size="small"
                disabled={!activeForm || isLoading.save}
              >
                {isLoading.save ? <CircularProgress size={24} /> : <SaveIcon />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Undo">
            <span>
              <IconButton onClick={handleUndo} size="small" disabled={!canUndo}>
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo">
            <span>
              <IconButton onClick={handleRedo} size="small" disabled={!canRedo}>
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Preview">
            <span>
              <IconButton
                onClick={handlePreview}
                size="small"
                disabled={!activeForm || isLoading.preview}
              >
                {isLoading.preview ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviewIcon />
                )}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Publish">
            <span>
              <IconButton
                onClick={handlePublish}
                size="small"
                disabled={!activeForm || isLoading.publish}
              >
                {isLoading.publish ? (
                  <CircularProgress size={24} />
                ) : (
                  <PublishIcon />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </ErrorBoundary>

      <div className={styles.rightSection}>
        <button
          className={styles.userSection}
          onClick={(e) => setUserMenuAnchor(e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setUserMenuAnchor(e.currentTarget);
            }
          }}
        >
          <div className={styles.avatar}>
            <AccountCircleIcon />
          </div>
          <span className={styles.userName}>John Doe</span>
        </button>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={() => setUserMenuAnchor(null)}
          className={styles.menu}
        >
          <MenuItem onClick={handleSettings} className={styles.menuItem}>
            <SettingsIcon className={styles.menuIcon} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} className={styles.menuItem}>
            <LogoutIcon className={styles.menuIcon} />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};
