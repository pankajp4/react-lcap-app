import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../features/store";
import styles from "./DroppableComponent.module.css";

interface DroppableComponentProps {
  component: BuilderComponent;
  onSelect: (id: string) => void;
  onResize?: (id: string, width: number, height: number) => void;
}

/**
 * A component that has been dropped onto the canvas
 * Includes resize handles and selection state
 */
export const DroppableComponent = ({
  component,
  onSelect,
  onResize,
}: DroppableComponentProps) => {
  const selectedComponentId = useSelector(
    (state: RootState) => state.builder.selectedComponentId
  );
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({
    width: component.width,
    height: component.height,
  });

  // Update size when component props change
  useEffect(() => {
    setSize({ width: component.width, height: component.height });
  }, [component.width, component.height]);

  const handleMouseDown = (
    e: React.MouseEvent,
    type: "right" | "bottom" | "corner"
  ) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isDragging) {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        if (type === "right" || type === "corner") {
          newWidth = Math.max(50, startWidth + deltaX);
        }
        if (type === "bottom" || type === "corner") {
          newHeight = Math.max(50, startHeight + deltaY);
        }

        setSize({ width: newWidth, height: newHeight });
        onResize?.(component.id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const isSelected = selectedComponentId === component.id;

  return (
    <Box
      className={`${styles.componentWrapper} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={() => onSelect(component.id)}
      sx={{
        width: size.width,
        height: size.height,
        gridColumn: `span ${Math.ceil(size.width / 80)}`,
      }}
    >
      {/* Component content would go here */}
      <Box sx={{ p: 2 }}>{component.label}</Box>

      {isSelected && (
        <>
          <button
            className={styles.resizeHandleRight}
            onMouseDown={(e) => handleMouseDown(e, "right")}
            aria-label="Resize width"
            tabIndex={0}
          />
          <button
            className={styles.resizeHandleBottom}
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
            aria-label="Resize height"
            tabIndex={0}
          />
          <button
            className={styles.resizeHandleCorner}
            onMouseDown={(e) => handleMouseDown(e, "corner")}
            aria-label="Resize both width and height"
            tabIndex={0}
          />
        </>
      )}
    </Box>
  );
};
