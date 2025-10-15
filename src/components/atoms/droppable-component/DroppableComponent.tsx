import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../store/store";

/**
 * Props for the DroppableComponent
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * The DroppableComponent manages:
 * - Component rendering and positioning
 * - Selection and focus state
 * - Resize handle interactions
 * - Drop target validation
 * - Grid snapping behavior
 *
 * Event Handling:
 * - Mouse/touch selection
 * - Keyboard navigation
 * - Drag enter/leave events
 * - Drop validation and handling
 */
interface DroppableComponentProps {
  /**
   * The component configuration and state.
   * Includes position, size, and other component-specific properties.
   */
  component: BuilderComponent;

  /**
   * Callback function when the component is selected.
   * @param id - The unique identifier of the selected component
   */
  onSelect: (id: string) => void;

  /**
   * Callback function when the component is deselected.
   * Called when clicking outside or selecting another component.
   */
  onDeselect: () => void;

  /**
   * Whether the component is currently selected.
   * Controls the visual state and resize handles visibility.
   * @defaultValue false
   */
  isSelected?: boolean;

  /**
   * Callback function when the component is resized.
   * @param width - The new width of the component
   * @param height - The new height of the component
   */
  onResize?: (width: number, height: number) => void;
}

/**
 * A component that can be dropped onto and resized in the form builder canvas.
 *
 * @component
 * @category Components
 * @subcategory DragAndDrop
 *
 * @remarks
 * This component handles the following interactions:
 * - Selection/deselection
 * - Resizing with drag handles
 * - Visual feedback for drag operations
 * - Integration with the global selection state
 *
 * @example
 * ```tsx
 * <DroppableComponent
 *   component={{
 *     id: "textbox-1",
 *     type: "textbox",
 *     position: { x: 100, y: 100 },
 *     size: { width: 200, height: 40 }
 *   }}
 *   onSelect={(id) => console.log('Selected:', id)}
 *   onDeselect={() => console.log('Deselected')}
 *   isSelected={true}
 *   onResize={(w, h) => console.log('Resized:', w, h)}
 * />
 * ```
 */
export const DroppableComponent = ({
  component,
  onSelect,
  onDeselect,
  isSelected,
  onResize,
}: DroppableComponentProps) => {
  /** Tracks whether the component is being dragged over */
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(e.type === "dragenter");
  }, []);

  /** Tracks whether the component is currently being resized */
  const [isResizing, setIsResizing] = useState(false);

  /** Subscribe to the global selected component state */
  const selectedId = useSelector(
    (state: RootState) => state.builder.selectedComponentId
  );

  // Memoize component styles and attributes
  const containerStyle = {
    transform: `translate(${component.x}px, ${component.y}px)`,
    width: `${component.width}px`,
    height: `${component.height}px`,
  };

  /**
   * Effect to handle deselection when another component is selected
   */
  useEffect(() => {
    if (!isSelected && selectedId !== component.id) {
      onDeselect();
    }

    // Add click outside handler when component is selected
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const componentElement = document.querySelector(
        `[data-testid="${component.id}"]`
      );
      if (
        isSelected &&
        componentElement &&
        !componentElement.contains(target)
      ) {
        onDeselect();
      }
    };

    if (isSelected) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [component.id, isSelected, onDeselect, selectedId]);

  /**
   * Handle mouse down events for component selection
   * Only responds to left-click to avoid interfering with context menus
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    onSelect(component.id);
  };

  /**
   * Handle keyboard events for accessibility
   * Allows selection via Enter or Space key
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(component.id);
    }
  };

  /**
   * Initiate and handle the resize operation
   * Sets up mouse move tracking and ensures minimum component dimensions
   */
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    /**
     * Track mouse movement to update component dimensions
     * Enforces minimum sizes of 100x50 pixels
     */
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = Math.max(100, moveEvent.clientX);
      const newHeight = Math.max(50, moveEvent.clientY);

      if (onResize) {
        onResize(newWidth, newHeight);
      }
    };

    /**
     * Clean up event listeners when resizing ends
     */
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach temporary event listeners for resize tracking
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  /**
   * Render the droppable component as a button for better accessibility
   * Includes:
   * - Visual states for dragging and selection
   * - Keyboard interaction support
   * - Recursive rendering of child components
   * - Resize handles when selected
   */
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "40px",
        border: 2,
        borderColor:
          isDraggingOver || isSelected ? "primary.main" : "transparent",
        transition: "border-color 0.3s",
        cursor: "pointer",
      }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      data-testid={component.id}
      data-dragging={`${isDraggingOver}`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      style={containerStyle}
    >
      {/* Recursively render child components */}
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

      {/* Render resize handles when component is selected */}
      {isSelected && !isResizing && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          <Box
            role="button"
            tabIndex={0}
            sx={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "primary.main",
              border: "1px solid #fff",
              pointerEvents: "auto",
              cursor: "nw-resize",
              top: "-4px",
              left: "-4px",
            }}
            onMouseDown={handleResizeStart}
            aria-label="Resize from top-left corner"
          />
          <Box
            role="button"
            tabIndex={0}
            sx={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "primary.main",
              border: "1px solid #fff",
              pointerEvents: "auto",
              cursor: "ne-resize",
              top: "-4px",
              right: "-4px",
            }}
            onMouseDown={handleResizeStart}
            aria-label="Resize from top-right corner"
          />
          <Box
            role="button"
            tabIndex={0}
            sx={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "primary.main",
              border: "1px solid #fff",
              pointerEvents: "auto",
              cursor: "sw-resize",
              bottom: "-4px",
              left: "-4px",
            }}
            onMouseDown={handleResizeStart}
            aria-label="Resize from bottom-left corner"
          />
          <Box
            role="button"
            tabIndex={0}
            sx={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "primary.main",
              border: "1px solid #fff",
              pointerEvents: "auto",
              cursor: "se-resize",
              bottom: "-4px",
              right: "-4px",
            }}
            onMouseDown={handleResizeStart}
            aria-label="Resize from bottom-right corner"
          />
        </Box>
      )}
    </Box>
  );
};
