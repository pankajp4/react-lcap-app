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

const componentsList = [
  { id: "text-input", name: "Text Input" },
  { id: "dropdown", name: "Dropdown" },
  { id: "checkbox", name: "Checkbox" },
];

const DraggableItem: React.FC<{ id: string; name: string }> = ({
  id,
  name,
}) => {
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
