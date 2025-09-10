import { Paper, Box, Typography } from "@mui/material";
import { availableComponents } from "../../../config/components";
import { ComponentGroup } from "../../molecules/form/ComponentGroup";
import type { ComponentConfig } from "../../../types/builder";

/**
 * The left sidebar containing all available components grouped by category
 */
export const ComponentSidebar = () => {
  // Group components by category
  const groupedComponents = availableComponents.reduce<
    Record<string, ComponentConfig[]>
  >((acc, component) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {});

  // Convert category names to title case
  const formatCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 280,
        height: "100vh",
        overflowY: "auto",
        borderRadius: 0,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Components
        </Typography>
        {Object.entries(groupedComponents).map(([category, components]) => (
          <ComponentGroup
            key={category}
            title={formatCategoryTitle(category)}
            components={components}
          />
        ))}
      </Box>
    </Paper>
  );
};
