import React from "react";
import { componentRegistry } from "../../componentRegistry";
import type { BaseComponent } from "../../types";
import { Box, IconButton, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import styles from "./Canvas.module.css";

interface CanvasProps {
  components: BaseComponent[];
  selectedId: string | null;
  onComponentDrop: (component: BaseComponent, parentId?: string) => void;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
}

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
        className={clsx(styles.componentWrapper, {
          [styles.isSelected]: isSelected,
        })}
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
            className={clsx(styles.dropIndicator, {
              [styles.isOver]: dragOverId === component.id,
            })}
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
          className={clsx(styles.emptyCanvas, {
            [styles.isOver]: dragOverId === "root",
          })}
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
