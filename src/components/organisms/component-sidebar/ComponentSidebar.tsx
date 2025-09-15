import { Paper, Box } from "@mui/material";
import { availableComponents } from "../../../config/components";
import { ComponentGroup } from "../../molecules";
import type { ComponentConfig } from "../../../types/builder";
import styles from "./ComponentSidebar.module.css";

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
    <Paper elevation={1} className={styles.sidebar}>
      <Box className={styles.content}>
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
