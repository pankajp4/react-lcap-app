/**
 * @fileoverview
 * Canvas component for the UI Builder.
 * Provides the main workspace for adding, arranging, and managing UI components.
 *
 * @module Pages/UIBuilder/Components/Canvas
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { componentRegistry } from "../../../../../utils/builder/componentRegistry";
import type { BaseComponent } from "../../../../../store/builder/types";
import { Box, IconButton, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";

/**
 * Props for the Canvas component
 * @interface
 * @category Props
 */
interface CanvasProps {
  /** Array of components currently on the canvas */
  components: BaseComponent[];
  /** ID of the currently selected component */
  selectedId: string | null;
  /** Callback fired when a component is dropped on the canvas */
  onComponentDrop: (component: BaseComponent, parentId?: string) => void;
  /** Callback fired when a component is selected */
  onSelectComponent: (id: string) => void;
  /** Callback fired when a component is deleted */
  onDeleteComponent: (id: string) => void;
}

/**
 * Canvas component
 * @description
 * Main canvas area for the UI Builder where users can drag, drop, arrange,
 * and manage components. Supports drag-and-drop, component selection, and deletion.
 *
 * @component
 * @param {CanvasProps} props - Component props
 * @returns {React.ReactElement} The rendered canvas component
 *
 * @example
 * ```tsx
 * <Canvas
 *   components={components}
 *   selectedId={selectedId}
 *   onComponentDrop={handleDrop}
 *   onSelectComponent={handleSelect}
 *   onDeleteComponent={handleDelete}
 * />
 * ```
 */
const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedId,
  onComponentDrop,
  onSelectComponent,
  onDeleteComponent,
}) => {
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id?: string) => {
    e.preventDefault();
    setDragOverId(id || "root");
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    parentId?: string
  ) => {
    e.preventDefault();
    setDragOverId(null);

    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component = JSON.parse(componentData);
      onComponentDrop(component, parentId);
    }
  };

  const renderComponent = (
    component: BaseComponent
  ): React.ReactElement | null => {
    const componentDef = componentRegistry
      .flatMap((group) => group.components)
      .find((c) => c.type === component.type);

    if (!componentDef) return null;

    const canHaveChildren = componentDef.allowedChildren?.length;
    const isSelected = selectedId === component.id;

    return (
      <Box
        key={component.id}
        sx={{
          padding: "12px",
          marginBottom: "12px",
          border: isSelected ? "2px solid #667eea" : "2px solid #e2e8f0",
          borderRadius: "8px",
          transition: "all 0.2s",
          backgroundColor: isSelected ? "#f7fafc" : "#ffffff",
          position: "relative",
          boxShadow: isSelected ? "0 0 0 3px rgba(102, 126, 234, 0.1)" : "none",
          "&:hover": {
            borderColor: isSelected ? "#667eea" : "#cbd5e0",
            boxShadow: isSelected
              ? "0 0 0 3px rgba(102, 126, 234, 0.1)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant={isSelected ? "contained" : "text"}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onSelectComponent(component.id);
            }}
            aria-pressed={isSelected}
            aria-label={`${component.name} component`}
            sx={{
              flexGrow: 1,
              justifyContent: "flex-start",
              textAlign: "left",
              padding: "8px 12px",
              backgroundColor: "#f7f8fa",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              color: "#2d3748",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#edf2f7",
                borderColor: "#cbd5e0",
              },
            }}
          >
            {component.name}
          </Button>
          <IconButton
            size="small"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDeleteComponent(component.id);
            }}
            aria-label={`Delete ${component.name} component`}
            sx={{
              minWidth: "auto",
              padding: "6px",
              color: "#e53e3e",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                color: "#c53030",
                backgroundColor: "#fed7d7",
                borderColor: "#fc8181",
              },
              "&:active": {
                backgroundColor: "#feb2b2",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
        {canHaveChildren && (
          <Box
            sx={{
              marginTop: "8px",
              padding: "16px",
              border:
                dragOverId === component.id
                  ? "2px dashed #667eea"
                  : "2px dashed #cbd5e0",
              borderRadius: "8px",
              minHeight: "60px",
              backgroundColor:
                dragOverId === component.id
                  ? "rgba(102, 126, 234, 0.05)"
                  : "#f7fafc",
              transition: "all 0.2s",
            }}
            onDragOver={(e) => handleDragOver(e, component.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, component.id)}
            aria-label={`Drop area for ${component.name}`}
          >
            {component.children?.map((child) => renderComponent(child))}
            {(!component.children || component.children.length === 0) && (
              <Box
                sx={{
                  textAlign: "center",
                  color: "#a0aec0",
                  fontSize: "0.875rem",
                  padding: "8px",
                }}
              >
                Drop components here
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        padding: "24px",
        minHeight: "400px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "2px dashed transparent",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s",
      }}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e)}
      aria-label="Component canvas"
    >
      {components.length > 0 ? (
        components.map((component) => renderComponent(component))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            border:
              dragOverId === "root"
                ? "2px dashed #667eea"
                : "2px dashed #cbd5e0",
            borderRadius: "12px",
            backgroundColor:
              dragOverId === "root" ? "rgba(102, 126, 234, 0.05)" : "#fafafa",
            color: "#a0aec0",
            fontSize: "1rem",
            fontWeight: 500,
            transition: "all 0.2s",
          }}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e)}
          aria-label="Empty canvas drop area"
        >
          Drag and drop components here
        </Box>
      )}
    </Box>
  );
};

export default Canvas;
