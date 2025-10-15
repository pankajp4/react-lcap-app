/**
 * @fileoverview
 * TemplateVersionDialog component for the UI Builder.
 * Display              <Box
                key={version.version}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor:
                    version.version === template.version ? "#f0f7ff" : "transparent",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">
                    Version {version.version}istory and allows restoring previous template versions.
 *
 * @module Pages/UIBuilder/Components/TemplateVersionDialog
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

import type {
  CustomTemplate,
  TemplateVersion,
} from "../../../../../utils/builder/customComponentManager";

/**
 * Props for the TemplateVersionDialog
 * @interface
 * @category Props
 */
interface TemplateVersionDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog should close */
  onClose: () => void;
  /** The template whose versions are being displayed */
  template: CustomTemplate;
  /** Callback fired when a version should be restored */
  onVersionRestore: (version: TemplateVersion) => void;
}

/**
 * TemplateVersionDialog component
 * @description
 * Dialog for viewing and restoring previous versions of a custom template.
 * Displays version history with timestamps and restore actions.
 *
 * @component
 * @param {TemplateVersionDialogProps} props - Component props
 * @returns {React.ReactElement} The rendered dialog
 *
 * @example
 * ```tsx
 * <TemplateVersionDialog
 *   open={isOpen}
 *   onClose={handleClose}
 *   template={template}
 *   onVersionRestore={handleRestore}
 * />
 * ```
 */
const TemplateVersionDialog: React.FC<TemplateVersionDialogProps> = ({
  open,
  onClose,
  template,
  onVersionRestore,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRestore = (version: TemplateVersion) => {
    onVersionRestore(version);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Version History - {template.name}</DialogTitle>
      <DialogContent>
        <List>
          {template.versions
            .slice()
            .reverse()
            .map((version) => (
              <Box
                key={version.version}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor:
                    version.version === template.currentVersion
                      ? "#f0f7ff"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">
                    Version {version.version}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(version.updatedAt)}
                  </Typography>
                  {version.notes && (
                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: "4px",
                        color: "#666",
                        fontSize: "0.875rem",
                      }}
                    >
                      {version.notes}
                    </Typography>
                  )}
                </Box>
                {version.version !== template.currentVersion && (
                  <IconButton
                    size="small"
                    onClick={() => handleRestore(version)}
                    title="Restore this version"
                  >
                    <RestoreIcon />
                  </IconButton>
                )}
              </Box>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateVersionDialog;
