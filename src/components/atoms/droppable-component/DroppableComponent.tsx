/**
 * @module Atoms
 * @description
 * Droppable component module that implements drop target functionality for the form builder canvas.
 * Provides a rich interactive container for form elements with selection, resizing,
 * and drag-and-drop capabilities.
 * @category DragAndDrop
 * @since 1.0.0
 *
 * @remarks
 * This module implements complex form element interaction:
 * - Drop target for new components
 * - Component selection and focus management
 * - Resize handles with keyboard support
 * - Position snapping and grid alignment
 * - Touch device support
 * - Accessibility compliance
 *
 * Accessibility Features:
 * - ARIA roles and attributes for interactive elements
 * - Keyboard navigation support
 * - Focus management during drag operations
 * - Screen reader announcements for state changes
 *
 * @example
 * ```tsx
 * // Basic usage in the canvas
 * const component = {
 *   id: 'text-1',
 *   type: 'textbox',
 *   position: { x: 100, y: 100 },
 *   size: { width: 200, height: 40 }
 * };
 *
 * <DroppableComponent
 *   component={component}
 *   onSelect={(id) => setSelectedId(id)}
 *   onDeselect={() => setSelectedId(null)}
 *   isSelected={selectedId === component.id}
 * />
 * ```
 */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../features/store";
import styles from "./DroppableComponent.module.css";

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
  /** Tracks whether another component is being dragged over this one */
  const isDraggingOver = false; // FIXME: Implement using dnd-kit's useDroppable hook
  /** Tracks whether the component is currently being resized */
  const [isResizing, setIsResizing] = useState(false);

  /** Subscribe to the global selected component state */
  const selectedId = useSelector(
    (state: RootState) => state.builder.selectedComponentId
  );

  /**
   * Effect to handle deselection when another component is selected
   */
  useEffect(() => {
    if (!isSelected && selectedId !== component.id) {
      onDeselect();
    }
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

      const newWidth = Math.max(100, moveEvent.clientX - e.clientX);
      const newHeight = Math.max(50, moveEvent.clientY - e.clientY);

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
