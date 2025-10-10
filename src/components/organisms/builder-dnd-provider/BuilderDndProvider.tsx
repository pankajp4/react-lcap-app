/**
 * @module Organisms
 * @description
 * Drag and drop provider component that enables form builder interactivity.
 * Manages component creation, positioning, and drag-and-drop operations.
 * @category FormBuilder
 */

import type { FC, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { addComponent } from "../../../features/builder/builderSlice";
import type { ComponentConfig } from "../../../types/builder";
import type { RootState } from "../../../features/store";

/**
 * Props for the BuilderDndProvider component
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * The BuilderDndProvider is the core component that enables drag and drop
 * functionality in the form builder. It wraps all interactive components
 * and coordinates their interactions using dnd-kit.
 *
 * Key responsibilities:
 * - Managing drag and drop context
 * - Coordinating component placement
 * - Handling component creation
 * - Integrating with Redux state
 */
interface BuilderDndProviderProps {
  /**
   * Child components that will be wrapped with drag and drop functionality.
   * Typically includes the builder layout and its child components.
   */
  children: ReactNode;
}

/**
 * Provider component that adds drag and drop functionality to the form builder.
 *
 * @component
 * @category Components
 * @subcategory FormBuilder
 *
 * @remarks
 * This component uses dnd-kit to provide drag and drop capabilities:
 * - Wraps the form builder components in a DndContext
 * - Handles drag events for component placement
 * - Manages the creation of new components from the sidebar
 * - Integrates with Redux for state management
 *
 * @example
 * ```tsx
 * <BuilderDndProvider>
 *   <BuilderLayout>
 *     <ComponentSidebar />
 *     <BuilderCanvas />
 *   </BuilderLayout>
 * </BuilderDndProvider>
 * ```
 */
export const BuilderDndProvider: FC<BuilderDndProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  /** Get the currently active form ID from Redux */
  const activeFormId = useSelector(
    (state: RootState) => state.builder.activeFormId
  );

  /**
   * Handle the start of a drag operation
   * Currently only used for logging, but could be extended for additional features
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // TODO: Consider removing console.log in production
    console.log("Drag start:", active);
  };

  /**
   * Handle drag over events for component placement feedback
   * Currently used for logging, could be extended for visual feedback
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    // FIXME: Replace with visual feedback implementation
    console.log("Drag over:", { active, over });
  };

  /**
   * Handle the end of a drag operation
   * Creates new components when dropped on the canvas
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Only handle drops on the canvas
    if (over && over.id === "builder-canvas") {
      if (!activeFormId) return; // Ensure we have an active form

      // Extract component configuration from the dragged item
      const componentData = active.data.current as ComponentConfig;
      const rect = over.rect as DOMRect;

      // Dispatch action to create new component with default dimensions
      dispatch(
        addComponent({
          formId: activeFormId,
          component: {
            // Generate unique ID using timestamp
            id: `${componentData.type}-${Date.now()}`,
            // Copy base component configuration
            type: componentData.type,
            icon: componentData.icon,
            label: componentData.label,
            // Position at drop location
            x: rect.x,
            y: rect.y,
            // Default dimensions
            width: 200,
            height: 40,
            // Initialize optional configurations
            props: componentData.props || {},
            style: componentData.style || {},
            validation: componentData.validation || {},
            api: componentData.api || {},
            category: componentData.category,
            properties: componentData.properties || [],
          },
        })
      );
    }
  };

  /**
   * Render the DndContext provider with event handlers
   * Wraps children with drag and drop functionality
   */
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
};
