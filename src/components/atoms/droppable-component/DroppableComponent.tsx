import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../features/store";
import styles from "./DroppableComponent.module.css";

interface DroppableComponentProps {
  component: BuilderComponent;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  isSelected?: boolean;
  onResize?: (width: number, height: number) => void;
}

export const DroppableComponent = ({
  component,
  onSelect,
  onDeselect,
  isSelected,
  onResize,
}: DroppableComponentProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const selectedId = useSelector(
    (state: RootState) => state.builder.selectedComponentId
  );

  useEffect(() => {
    if (!isSelected && selectedId !== component.id) {
      onDeselect();
    }
  }, [component.id, isSelected, onDeselect, selectedId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    onSelect(component.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(component.id);
    }
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResize = (width: number, height: number) => {
    setSize({ width, height });
    onResize?.(width, height);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  return (
    <Box
      className={`${styles.droppable} ${
        isDraggingOver ? styles.draggingOver : ""
      } ${isSelected ? styles.selected : ""}`}
      onClick={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      style={{
        width: size.width || component.style?.width || "100%",
        height: size.height || component.style?.height || "auto",
      }}
    >
      {component.children?.map((child) => (
        <DroppableComponent
          key={child.id}
          component={child}
          onSelect={onSelect}
          onDeselect={onDeselect}
          isSelected={selectedId === child.id}
          onResize={onResize}
        />
      ))}

      {isSelected && !isResizing && (
        <div className={styles.resizeHandles}>
          <div
            className={`${styles.handle} ${styles.topLeft}`}
            onMouseDown={handleResizeStart}
          />
          <div
            className={`${styles.handle} ${styles.topRight}`}
            onMouseDown={handleResizeStart}
          />
          <div
            className={`${styles.handle} ${styles.bottomLeft}`}
            onMouseDown={handleResizeStart}
          />
          <div
            className={`${styles.handle} ${styles.bottomRight}`}
            onMouseDown={handleResizeStart}
          />
        </div>
      )}
    </Box>
  );
};
