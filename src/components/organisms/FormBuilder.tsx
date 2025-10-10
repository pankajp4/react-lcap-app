/**
 * @module Organisms
 * @description
 * Simple form builder component that demonstrates basic drag and drop
 * functionality using dnd-kit.
 * @category FormBuilder
 */

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

/**
 * Interface representing a form element in the builder
 * @interface
 * @category Types
 * @since 1.0.0
 */
interface FormElement {
  /** Unique identifier for the form element */
  id: string;
  /** Type of the form element (e.g., 'textbox', 'button') */
  type: string;
}

/**
 * A simple form builder component with drag and drop capabilities.
 *
 * @component
 * @category Components
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * This component provides a basic implementation of a form builder using dnd-kit.
 * It demonstrates:
 * - Basic drag and drop setup
 * - Form element management
 * - Empty state handling
 * - Visual feedback
 *
 * Note: This is a simplified version of the form builder. For more advanced
 * functionality, see the BuilderCanvas component.
 *
 * @example
 * ```tsx
 * <FormBuilder />
 * ```
 */
const FormBuilder: React.FC = () => {
  /** State to track form elements */
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  /** Configure drag and drop sensors */
  const sensors = useSensors(useSensor(PointerSensor));

  /**
   * Handle the end of a drag operation
   * @param event - The drag end event from dnd-kit
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      setFormElements((prev) => [
        ...prev,
        { id: `${active.id}-${Date.now()}`, type: String(active.id) },
      ]);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6">Form Builder Area</Typography>
        <Paper sx={{ minHeight: "400px", p: 2, bgcolor: "#fff" }}>
          {formElements.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Drag components here
            </Typography>
          ) : (
            formElements.map((el) => (
              <Typography key={el.id} variant="body1" sx={{ mb: 1 }}>
                {el.type}
              </Typography>
            ))
          )}
        </Paper>
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
