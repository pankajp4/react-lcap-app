import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../../../features/builder/builderSlice";
import type { RootState } from "../../../features/store";
import styles from "./TopNavbar.module.css";

export const TopNavbar = () => {
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
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!activeFormId || formSaving}
          >
            {formSaving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
