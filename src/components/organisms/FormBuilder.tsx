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

interface FormElement {
  id: string;
  type: string;
}

const FormBuilder: React.FC = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

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
