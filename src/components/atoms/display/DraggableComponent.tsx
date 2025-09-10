import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Typography } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import type { ComponentConfig } from "../../../types/builder";

interface DraggableComponentProps {
  component: ComponentConfig;
}

/**
 * A draggable component that represents a form element in the component sidebar
 * Uses dnd-kit for drag and drop functionality
 */
export const DraggableComponent = ({ component }: DraggableComponentProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${component.type}`,
    data: component,
  });

  const Icon = MuiIcons[component.icon as keyof typeof MuiIcons];

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Paper
      ref={setNodeRef}
      elevation={1}
      sx={{
        p: 1,
        mb: 1,
        cursor: "grab",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Icon color="primary" fontSize="small" />
      <Typography variant="body2">{component.label}</Typography>
    </Paper>
  );
};
