/**
 * @fileoverview
 * ComponentList component for the UI Builder.
 * Displays a searchable, categorized list of available components.
 *
 * @module Pages/UIBuilder/Components/ComponentList
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { componentRegistry } from "../../../../../utils/builder/componentRegistry";
import type { BaseComponent } from "../../../../../store/builder/types";
import type { CustomTemplate } from "../../../../../utils/builder/customComponentManager";

interface ComponentListProps {
  onEditTemplate?: (template: CustomTemplate) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({
  onEditTemplate: _onEditTemplate,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleDragStart = (e: React.DragEvent, component: BaseComponent) => {
    const componentData: BaseComponent = {
      id: `${component.type}-${Date.now()}`,
      type: component.type,
      name: component.name,
      props: { ...component.props },
      children: [],
    };
    e.dataTransfer.setData("component", JSON.stringify(componentData));
  };

  const filteredRegistry = React.useMemo(() => {
    if (!searchTerm) return componentRegistry;

    return componentRegistry
      .map((group) => ({
        ...group,
        components: group.components.filter((component) =>
          component.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.components.length > 0);
  }, [searchTerm]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
          },
          "& .MuiInputBase-input": {
            padding: "10px 12px",
            fontSize: "0.875rem",
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.6)",
              opacity: 1,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#42a5f5",
            boxShadow: "0 0 0 3px rgba(66, 165, 245, 0.2)",
          },
        }}
        type="text"
        placeholder="Search components..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredRegistry.map((group) => (
        <Box key={group.name} sx={{ marginBottom: "20px" }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "12px",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.5px",
              paddingLeft: "4px",
            }}
          >
            {group.name}
          </Typography>
          {group.components.map((component) => (
            <Box
              key={component.type}
              draggable
              role="button"
              tabIndex={0}
              sx={{
                padding: "12px",
                cursor: "grab",
                borderRadius: "8px",
                transition: "all 0.2s",
                userSelect: "none",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                marginBottom: "8px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "#42a5f5",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
                "&:active": {
                  cursor: "grabbing",
                  transform: "translateY(0)",
                },
              }}
              onDragStart={(e) =>
                handleDragStart(e, {
                  id: "",
                  type: component.type,
                  name: component.name,
                  props: component.defaultProps,
                })
              }
            >
              {component.name}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ComponentList;
