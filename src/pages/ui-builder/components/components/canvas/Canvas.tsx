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
import { componentRegistry } from "@utils/builder/componentRegistry";
import type { BaseComponent } from "@store/builder/types";
import { Box, IconButton, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import styles from "@pages/ui-builder/components/components/canvas/Canvas.module.css";

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
        className={`${styles.componentWrapper} ${
          isSelected ? styles.isSelected : ""
        }`}
      >
        <Stack
          direction="row"
          alignItems="center"
          className={styles.componentPreview}
        >
          <Button
            variant={isSelected ? "contained" : "text"}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onSelectComponent(component.id);
            }}
            aria-pressed={isSelected}
            aria-label={`${component.name} component`}
            className={styles.componentButton}
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
            className={styles.deleteButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
        {canHaveChildren && (
          <Box
            className={`${styles.dropIndicator} ${
              dragOverId === component.id ? styles.isOver : ""
            }`}
            onDragOver={(e) => handleDragOver(e, component.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, component.id)}
            aria-label={`Drop area for ${component.name}`}
          >
            {component.children?.map((child) => renderComponent(child))}
            {(!component.children || component.children.length === 0) && (
              <Box className={styles.dropText}>Drop components here</Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      className={styles.canvasContainer}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e)}
      aria-label="Component canvas"
    >
      {components.length > 0 ? (
        components.map((component) => renderComponent(component))
      ) : (
        <Box
          className={`${styles.emptyCanvas} ${
            dragOverId === "root" ? styles.isOver : ""
          }`}
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
