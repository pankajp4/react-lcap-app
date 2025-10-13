/**
 * @module Atoms
 * @description
 * Draggable component module that implements drag source functionality for the form builder.
 * Provides a consistent draggable interface for form elements in the component sidebar.
 * @category DragAndDrop
 * @since 1.0.0
 *
 * @remarks
 * This module uses @dnd-kit/core for drag and drop functionality, providing:
 * - Consistent drag preview
 * - Accessibility support via ARIA attributes
 * - Touch device support
 * - Keyboard navigation
 * - Custom drag handles
 *
 * @example
 * ```tsx
 * // Basic usage in the component sidebar
 * const componentConfig = {
 *   type: 'textbox',
 *   name: 'Text Input',
 *   icon: 'TextFields'
 * };
 *
 * <DraggableComponent component={componentConfig} />
 * ```
 */

import { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Typography } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import type { ComponentConfig } from "../../../types/builder";
import styles from "./DraggableComponent.module.css";

type DragEvent = {
  [key: string]: any;
};

/**
 * Props for the DraggableComponent
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * The component configuration includes:
 * - Component type (e.g., 'textbox', 'select', 'checkbox')
 * - Display name shown in the UI
 * - Icon from Material-UI icons
 * - Optional custom properties for specialized components
 *
 * Accessibility:
 * - Adds role="button" for keyboard interaction
 * - Supports keyboard activation (Space/Enter)
 * - Announces drag start/end states
 * - Provides focus management
 */
interface DraggableComponentProps {
  /**
   * Configuration for the component being dragged
   * @remarks
   * The configuration object defines:
   * - type: Unique identifier for the component type
   * - name: Human-readable display name
   * - icon: Material-UI icon name
   * - properties: Optional component-specific configuration
   */
  component: ComponentConfig;

  /**
   * Callback when drag starts
   */
  onDragStart?: () => void;

  /**
   * Callback when drag ends
   */
  onDragEnd?: () => void;

  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * A draggable component that represents a form element in the component sidebar.
 *
 * @component
 * @category Components
 * @subcategory DragAndDrop
 *
 * @remarks
 * Uses dnd-kit for drag and drop functionality. The component displays
 * an icon and label, and can be dragged to the canvas area.
 *
 * @example
 * ```tsx
 * <DraggableComponent
 *   component={{
 *     type: "textbox",
 *     name: "Text Input",
 *     icon: "TextFields"
 *   }}
 * />
 * ```
 */
/**
 * The implementation of the DraggableComponent.
 *
 * @function
 * @param {DraggableComponentProps} props - The component props
 * @returns {JSX.Element} A draggable Paper component containing an icon and label
 */
export const DraggableComponent = ({
  component,
  onDragStart,
  onDragEnd,
  disabled = false,
}: DraggableComponentProps) => {
  /**
   * Hook up the draggable functionality using dnd-kit's useDraggable hook.
   * Creates a unique ID for each component type and attaches the component data.
   */
  const {
    attributes,
    listeners: baseListeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `sidebar-${component.type}`,
    data: component,
    disabled,
  });

  // Don't create listeners if disabled
  const listeners = disabled
    ? undefined
    : {
        ...baseListeners,
        onDragStart: (e: any) => {
          baseListeners?.onDragStart?.(e);
          onDragStart?.();
        },
        onDragEnd: (e: any) => {
          baseListeners?.onDragEnd?.(e);
          onDragEnd?.();
        },
      };

  // Create enhanced listeners that call our callback functions
  const enhancedListeners = disabled
    ? undefined
    : {
        ...baseListeners,
        onDragStart: (e: any) => {
          baseListeners?.onDragStart?.(e);
          onDragStart?.();
        },
        onDragEnd: (e: any) => {
          baseListeners?.onDragEnd?.(e);
          onDragEnd?.();
        },
      };

  /**
   * Dynamically get the Material-UI icon component based on the icon name in the config.
   * Type assertion is needed since we're using dynamic key access.
   */
  const Icon = MuiIcons[component.icon as keyof typeof MuiIcons];

  /**
   * Apply transform styles when the component is being dragged.
   * Uses dnd-kit's CSS utilities to ensure proper transform formatting.
   */
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  /**
   * Render a Material-UI Paper component that acts as a draggable container.
   * The ref, attributes, and listeners from dnd-kit are spread onto the Paper component
   * to enable drag functionality. The content includes an optional icon and a label.
   */
  // Setup drag event handlers
  useEffect(() => {
    if (listeners) {
      const originalDragStart = listeners.onDragStart;
      const originalDragEnd = listeners.onDragEnd;

      const newListeners = {
        ...listeners,
        onDragStart: (e: DragEvent) => {
          originalDragStart?.(e);
          onDragStart?.();
        },
        onDragEnd: (e: DragEvent) => {
          originalDragEnd?.(e);
          onDragEnd?.();
        },
      };

      Object.assign(listeners, newListeners);
    }
  }, [listeners, onDragStart, onDragEnd]);

  return (
    <Paper
      ref={setNodeRef}
      elevation={1}
      data-draggable-id={`sidebar-${component.type}`}
      aria-label={`Drag ${component.label} component`}
      className={`${styles.draggable} ${disabled ? styles.disabled : ""}`}
      style={style}
      {...attributes}
      {...enhancedListeners}
    >
      <div className={styles.content}>
        {/* Conditionally render the icon if one is specified in the config */}
        {Icon && (
          <Icon className={styles.icon} data-testid={`${component.icon}Icon`} />
        )}
        {/* Display the component label using MUI Typography */}
        <Typography variant="body2">{component.label}</Typography>
      </div>
    </Paper>
  );
};
