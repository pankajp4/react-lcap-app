import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Typography } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import type { ComponentConfig } from "../../../../types/builder";
import styles from "./DraggableComponent.module.css";

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
      className={styles.draggable}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.content}>
        {Icon && <Icon className={styles.icon} />}
        <Typography variant="body2">{component.label}</Typography>
      </div>
    </Paper>
  );
};
