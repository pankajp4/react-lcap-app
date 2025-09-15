import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const isDraggingOver = false; // TODO: Implement drag over state
  const [isResizing, setIsResizing] = useState(false);

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

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = Math.max(100, moveEvent.clientX - e.clientX);
      const newHeight = Math.max(50, moveEvent.clientY - e.clientY);

      if (onResize) {
        onResize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <button
      type="button"
      className={`${styles.droppable} ${
        isDraggingOver ? styles.draggingOver : ""
      } ${isSelected ? styles.selected : ""}`}
      onClick={handleMouseDown}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      style={{
        width: component.style?.width || "100%",
        height: component.style?.height || "auto",
      }}
    >
      {component.children?.map((child: BuilderComponent) => (
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
          <button
            type="button"
            className={`${styles.handle} ${styles.topLeft}`}
            onMouseDown={handleResizeStart}
            aria-label="Resize from top-left corner"
          />
          <button
            type="button"
            className={`${styles.handle} ${styles.topRight}`}
            onMouseDown={handleResizeStart}
            aria-label="Resize from top-right corner"
          />
          <button
            type="button"
            className={`${styles.handle} ${styles.bottomLeft}`}
            onMouseDown={handleResizeStart}
            aria-label="Resize from bottom-left corner"
          />
          <button
            type="button"
            className={`${styles.handle} ${styles.bottomRight}`}
            onMouseDown={handleResizeStart}
            aria-label="Resize from bottom-right corner"
          />
        </div>
      )}
    </button>
  );
};
