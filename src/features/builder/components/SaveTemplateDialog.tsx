import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { BaseComponent } from "../types";
import type { CustomTemplate } from "../customComponentManager";
import customComponentManager from "../customComponentManager";

const CATEGORIES = [
  "Layout",
  "Forms",
  "Data Display",
  "Navigation",
  "Feedback",
  "Custom",
  "Uncategorized",
];

interface SaveTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  components: BaseComponent[];
  onSave: () => void;
  isUpdate?: boolean;
  initialData?: CustomTemplate;
  version?: {
    current: number;
    notes?: string;
  };
}

const SaveTemplateDialog: React.FC<SaveTemplateDialogProps> = ({
  open,
  onClose,
  components,
  onSave,
  isUpdate = false,
  initialData,
  version,
}) => {
  const [name, setName] = React.useState(initialData?.name || "");
  const [description, setDescription] = React.useState(
    initialData?.description || ""
  );
  const [category, setCategory] = React.useState(
    initialData?.category || "Uncategorized"
  );
  const [tags, setTags] = React.useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = React.useState("");
  const [versionNotes, setVersionNotes] = React.useState(version?.notes || "");
  const [error, setError] = React.useState<string | null>(null);

  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError("Template name is required");
      return;
    }

    try {
      if (isUpdate && initialData) {
        customComponentManager.updateTemplateVersion(
          initialData.id,
          components,
          versionNotes
        );
      } else {
        customComponentManager.saveTemplate(
          name.trim(),
          description.trim(),
          components,
          category,
          tags
        );
      }

      setName("");
      setDescription("");
      setCategory("Uncategorized");
      setTags([]);
      setVersionNotes("");
      setError(null);
      onSave();
      onClose();
    } catch (error: any) {
      setError(error?.message || "Failed to save template");
      console.error("Failed to save template:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isUpdate ? "Update Template" : "Save as Template"}
        {initialData && ` (v${initialData.currentVersion + 1})`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Template Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isUpdate}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Tags
          </Typography>
          <Box display="flex" gap={1} mb={1} flexWrap="wrap">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                size="small"
              />
            ))}
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <IconButton onClick={handleAddTag} size="small">
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        {version && (
          <TextField
            margin="dense"
            label="Version Notes"
            fullWidth
            multiline
            rows={2}
            value={versionNotes}
            onChange={(e) => setVersionNotes(e.target.value)}
            placeholder="What changed in this version? (optional)"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {isUpdate ? "Update Template" : "Save Template"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveTemplateDialog;
