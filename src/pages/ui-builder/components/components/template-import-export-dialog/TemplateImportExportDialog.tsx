/**
 * @fileoverview
 * TemplateImportExportDialog component for the UI Builder.
 * Handles importing and exporting custom component templates as JSON.
 *
 * @module Pages/UIBuilder/Components/TemplateImportExportDialog
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
  TextField,
  Typography,
  Box,
} from "@mui/material";
import customComponentManager from "../../../../../utils/builder/customComponentManager";
import type { CustomTemplate } from "../../../../../utils/builder/customComponentManager";

/**
 * Props for the TemplateImportExportDialog
 * @interface
 * @category Props
 */
interface TemplateImportExportDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog should close */
  onClose: () => void;
  /** Callback fired when import/export is complete */
  onComplete: () => void;
  /** Mode of operation - import or export */
  mode: "import" | "export";
  /** Templates to export (only used in export mode) */
  selectedTemplates?: CustomTemplate[];
}

/**
 * TemplateImportExportDialog component
 * @description
 * Dialog for importing and exporting custom component templates.
 * Supports JSON format for template data exchange.
 *
 * @component
 * @param {TemplateImportExportDialogProps} props - Component props
 * @returns {React.ReactElement} The rendered dialog
 *
 * @example
 * ```tsx
 * <TemplateImportExportDialog
 *   open={isOpen}
 *   onClose={handleClose}
 *   onComplete={handleComplete}
 *   mode="export"
 *   selectedTemplates={templates}
 * />
 * ```
 */
const TemplateImportExportDialog: React.FC<TemplateImportExportDialogProps> = ({
  open,
  onClose,
  onComplete,
  mode,
  selectedTemplates,
}) => {
  const [importData, setImportData] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<{
    imported?: number;
    errors?: number;
  } | null>(null);

  const handleImport = () => {
    try {
      const result = customComponentManager.importTemplates(importData);
      setResult(result);
      if (result.imported > 0) {
        setTimeout(() => {
          onComplete();
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to parse template data:", err);
      setError("Invalid template data");
    }
  };

  const handleExport = () => {
    try {
      const data = customComponentManager.exportTemplates(
        selectedTemplates?.map((t) => t.id)
      );

      // Create and trigger download
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ui-builder-templates.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onClose();
    } catch (err) {
      console.error("Failed to export templates:", err);
      setError("Failed to export templates");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {mode === "import" ? "Import Templates" : "Export Templates"}
      </DialogTitle>
      <DialogContent>
        {mode === "import" ? (
          <>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Paste the template JSON data below to import:
            </Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              value={importData}
              onChange={(e) => {
                setImportData(e.target.value);
                setError(null);
                setResult(null);
              }}
              error={!!error}
              helperText={error}
              placeholder="Paste template JSON here..."
            />
            {result && (
              <Box mt={2}>
                <Typography color="success.main">
                  Successfully imported {result.imported} template(s)
                </Typography>
                {(result?.errors ?? 0) > 0 && (
                  <Typography color="error">
                    Failed to import {result.errors} template(s)
                  </Typography>
                )}
              </Box>
            )}
          </>
        ) : (
          <Typography>
            {selectedTemplates
              ? `Exporting ${selectedTemplates.length} selected template(s)`
              : "Exporting all templates"}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={mode === "import" ? handleImport : handleExport}
          color="primary"
          variant="contained"
          disabled={mode === "import" && !importData.trim()}
        >
          {mode === "import" ? "Import" : "Export"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateImportExportDialog;
