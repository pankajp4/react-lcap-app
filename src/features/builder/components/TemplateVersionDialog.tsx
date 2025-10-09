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
} from "../customComponentManager";

interface TemplateVersionDialogProps {
  open: boolean;
  onClose: () => void;
  template: CustomTemplate;
  onVersionRestore: (version: TemplateVersion) => void;
}

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
                  alignItems: "flex-start",
                  p: 1,
                  bgcolor:
                    version.version === template.currentVersion
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    Version {version.version}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(version.updatedAt)}
                  </Typography>
                  {version.notes && (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
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
