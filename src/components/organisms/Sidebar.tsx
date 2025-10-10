/**
 * @module Organisms
 * @description
 * Simple sidebar component that lists draggable form components.
 * This is a basic implementation used for demonstration purposes.
 * @category FormBuilder
 */

import { useDraggable } from "@dnd-kit/core";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

/**
 * List of available form components
 * @constant
 * @category Configuration
 */
const componentsList = [
  { id: "text-input", name: "Text Input" },
  { id: "dropdown", name: "Dropdown" },
  { id: "checkbox", name: "Checkbox" },
];

/**
 * Props for the DraggableItem component
 * @interface
 * @category Props
 */
interface DraggableItemProps {
  /** Unique identifier for the component */
  id: string;
  /** Display name of the component */
  name: string;
}

/**
 * A list item that can be dragged using dnd-kit.
 *
 * @component
 * @category Components
 * @since 1.0.0
 */
const DraggableItem: React.FC<DraggableItemProps> = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ListItemButton>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

/**
 * A simple sidebar component that displays draggable form components.
 *
 * @component
 * @category Navigation
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * This is a basic implementation of a component sidebar that demonstrates:
 * - List-based component display
 * - Drag and drop integration with dnd-kit
 * - Material-UI styling and layout
 *
 * Note: For a more complete implementation, see the ComponentSidebar component.
 *
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 250, p: 2, bgcolor: "#f5f5f5" }}>
      <Typography variant="h6">Components</Typography>
      <List>
        {componentsList.map((comp) => (
          <DraggableItem key={comp.id} id={comp.id} name={comp.name} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
