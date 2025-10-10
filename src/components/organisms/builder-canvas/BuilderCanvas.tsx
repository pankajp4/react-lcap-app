/**
 * @module Organisms
 * @description
 * Main canvas component for the form builder where components are arranged
 * and configured through drag-and-drop interactions.
 * @category FormBuilder
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { Typography } from "@mui/material";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../features/store";
import {
  updateComponent,
  setSelectedComponent,
} from "../../../features/builder/builderSlice";
import { DroppableComponent } from "../../atoms";
import styles from "./BuilderCanvas.module.css";

/**
 * The main canvas area where form components can be dropped and arranged.
 *
 * @component
 * @category Components
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * The BuilderCanvas is the core workspace of the form builder where users
 * construct their forms. It provides a visual area for arranging and configuring
 * form components through drag-and-drop interactions.
 *
 * Key features:
 * - Drag and drop interactions using dnd-kit
 * - Component selection and deselection
 * - Visual feedback for drag operations
 * - Empty state handling
 * - Grid-based layout system
 * - Component positioning and sizing
 *
 * State management:
 * - Uses Redux for form state
 * - Maintains local state for drag operations
 * - Tracks component selection state
 * - Handles component updates
 *
 * @example
 * ```tsx
 * // Within the BuilderLayout
 * <BuilderCanvas />
 * ```
 */
export const BuilderCanvas: React.FC = () => {
  const dispatch = useDispatch();

  /** Configure the canvas as a droppable area using dnd-kit */
  const { isOver, setNodeRef } = useDroppable({
    id: "builder-canvas",
  });

  /**
   * Select active form data from Redux store
   * Includes form ID and complete form data if available
   */
  const { activeFormId, activeForm } = useSelector((state: RootState) => ({
    activeFormId: state.builder.activeFormId,
    activeForm: state.builder.activeFormId
      ? state.builder.forms.find((f) => f.id === state.builder.activeFormId)
      : null,
  }));

  /**
   * Handle component selection in the canvas
   * Dispatches the selection action to Redux
   * @param {string} id - ID of the component to select
   */
  const handleSelect = useCallback(
    (id: string) => {
      dispatch(setSelectedComponent(id));
    },
    [dispatch, activeFormId]
  );

  /**
   * Handle component deselection
   * Clears the selected component ID from Redux
   */
  const handleDeselect = useCallback(() => {
    dispatch(setSelectedComponent(null));
  }, [dispatch]);

  /**
   * Handle component resizing
   * Updates the component's dimensions in Redux
   * @param {string} id - ID of the component being resized
   * @returns {Function} Resize handler function
   */
  const handleComponentResize = useCallback(
    (id: string) => (width: number, height: number) => {
      if (!activeFormId) return;
      dispatch(
        updateComponent({
          formId: activeFormId,
          componentId: id,
          updates: {
            style: {
              width: `${width}px`,
              height: `${height}px`,
            },
          },
        })
      );
    },
    [dispatch, activeFormId]
  );

  /**
   * Render empty state when no form is selected
   */
  if (!activeForm) {
    return (
      <section className={styles.emptyCanvas} aria-label="Empty form canvas">
        <Typography variant="body1" color="textSecondary">
          Select or create a form to start building
        </Typography>
      </section>
    );
  }

  /**
   * Render the active form canvas with its components
   */
  return (
    <section
      ref={setNodeRef}
      className={`${styles.canvas} ${isOver ? styles.dragOver : ""}`}
      aria-label="Form builder canvas"
    >
      {/* Map and render all form components */}
      {activeForm.components?.map((component: BuilderComponent) => (
        <DroppableComponent
          key={component.id}
          component={component}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          onResize={handleComponentResize(component.id)}
          aria-label={`${component.label || component.type} component`}
        />
      ))}

      {/* Show empty state message when no components exist */}
      {activeForm.components?.length === 0 && (
        <output className={styles.emptyMessage}>
          <Typography variant="body1" color="textSecondary">
            Drag and drop components here
          </Typography>
        </output>
      )}
    </section>
  );
};
