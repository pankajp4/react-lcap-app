/**
 * @module Organisms
 * @description
 * Component sidebar that provides a categorized list of available form components
 * that can be dragged onto the form builder canvas.
 * @category FormBuilder
 */

import { Paper, Box } from "@mui/material";

import type { ComponentConfig } from "@/types/builder";
import { availableComponents } from "@config/components";
import { ComponentGroup } from "@molecules";
import styles from "@organisms/component-sidebar/ComponentSidebar.module.css";

/**
 * Left sidebar component that displays available form components grouped by category.
 *
 * @component
 * @category Navigation
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * The ComponentSidebar serves as the primary source of form components in the
 * builder interface. It organizes available components into collapsible category
 * groups for easy access and management.
 *
 * Features:
 * - Dynamic component categorization
 * - Collapsible category groups
 * - Drag-and-drop component creation
 * - Responsive design adaptation
 * - Search and filtering (planned)
 *
 * Component Organization:
 * - Groups components by category (Input, Layout, etc.)
 * - Uses Material-UI Paper for elevation and styling
 * - Implements ComponentGroup for each category
 * - Provides drag source capabilities
 *
 * Accessibility:
 * - Proper ARIA labels for navigation
 * - Keyboard-accessible component groups
 * - Screen reader friendly structure
 *
 * @example
 * ```tsx
 * // Basic usage within BuilderLayout
 * <ComponentSidebar />
 *
 * // With custom styling
 * <div className="custom-sidebar">
 *   <ComponentSidebar />
 * </div>
 * ```
 */
export const ComponentSidebar = () => {
  /**
   * Organize components into category groups
   * Creates a map of category names to arrays of components
   */
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

  /**
   * Format category names for display
   * Converts snake_case or lowercase to Title Case
   * @param {string} category - The category name to format
   * @returns {string} Formatted category name
   */
  const formatCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  /**
   * Render the sidebar with categorized component groups
   */
  return (
    <Paper
      elevation={1}
      component="section"
      aria-label="Component palette"
      className={styles.sidebar}
    >
      <Box
        component="nav"
        aria-label="Available components"
        className={styles.content}
      >
        {/* Render each category group */}
        {Object.entries(groupedComponents).map(([category, components]) => (
          <ComponentGroup
            key={category}
            title={formatCategoryTitle(category)}
            components={components}
            aria-label={`${formatCategoryTitle(category)} components`}
          />
        ))}
      </Box>
    </Paper>
  );
};
