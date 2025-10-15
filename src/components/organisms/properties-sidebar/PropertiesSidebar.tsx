/**
 * @module Organisms
 * @description
 * Properties sidebar component that provides the interface for viewing and editing
 * the properties of the currently selected form component.
 * @category FormBuilder
 */

import { Paper, Typography, Box } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { PropertyConfig } from "@/types/builder";
import type { RootState } from "@store/store";
import { updateComponent } from "@store/builder/builderSlice";
import { PropertyField } from "@atoms";
import styles from "@organisms/properties-sidebar/PropertiesSidebar.module.css";

/**
 * Right sidebar component that displays and manages properties of the selected component.
 *
 * @component
 * @category Configuration
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * The PropertiesSidebar is a critical part of the form builder interface that
 * enables users to view and modify the properties of selected components. It
 * provides a dynamic interface that adapts to the type of component selected.
 *
 * Key Features:
 * - Real-time property editing
 * - Dynamic property type handling
 * - Immediate visual feedback
 * - Undo/redo support
 * - Property validation
 * - Grouped properties display
 *
 * State Management:
 * - Uses Redux for component state
 * - Tracks selection changes
 * - Handles property updates
 * - Maintains edit history
 *
 * Component Properties:
 * - Basic properties (ID, name, label)
 * - Style properties (size, color, alignment)
 * - Validation rules
 * - Event handlers
 * - Custom configurations
 *
 * @example
 * ```tsx
 * // Basic usage within BuilderLayout
 * <PropertiesSidebar />
 *
 * // With custom styling
 * <div className="custom-properties-panel">
 *   <PropertiesSidebar />
 * </div>
 * ```
 */
export const PropertiesSidebar = () => {
  const dispatch = useDispatch();

  /**
   * Select and derive component data from Redux store
   * Includes:
   * - Currently selected component instance
   * - Component type configuration
   * - Active form ID for updates
   */
  const { selectedComponent, componentConfig, activeFormId } = useSelector(
    (state: RootState) => {
      const selectedId = state.builder.selectedComponentId;
      const activeFormId = state.builder.activeFormId;
      const activeForm = state.builder.forms.find((f) => f.id === activeFormId);

      // Find the selected component instance
      const component = activeForm?.components.find((c) => c.id === selectedId);

      // Get the component type configuration
      const config = component
        ? state.builder.availableComponents.find(
            (c) => c.type === component.type
          )
        : null;

      return {
        selectedComponent: component,
        componentConfig: config,
        activeFormId: state.builder.activeFormId,
      };
    }
  );

  /**
   * Creates a handler for property value changes
   * Dispatches updates to Redux when property values change
   *
   * @param {string} property - Name of the property being changed
   * @returns {Function} Change handler for the specific property
   */
  const handlePropertyChange = useCallback(
    (property: string) =>
      (value: string | number | boolean | object | unknown[] | null) => {
        // Guard against invalid states
        if (!selectedComponent || !activeFormId) return;

        // Dispatch update action to Redux
        dispatch(
          updateComponent({
            formId: activeFormId,
            componentId: selectedComponent.id,
            updates: {
              [property]: value,
            },
          })
        );
      },
    [dispatch, selectedComponent, activeFormId]
  );

  /**
   * Render empty state when no component is selected
   */
  if (!selectedComponent || !componentConfig) {
    return (
      <Paper
        elevation={1}
        component="section"
        aria-label="Properties panel - No component selected"
        className={styles.sidebar}
      >
        <Box className={styles.empty}>
          <Typography variant="body1" color="textSecondary" component="output">
            Select a component to edit its properties
          </Typography>
        </Box>
      </Paper>
    );
  }

  /**
   * Render properties panel for selected component
   */
  return (
    <Paper
      elevation={1}
      component="section"
      aria-label={`Properties panel - ${componentConfig.label}`}
      className={styles.sidebar}
    >
      {/* Header with component type and section label */}
      <Box component="header" className={styles.header}>
        <Typography variant="h6">{componentConfig.label}</Typography>
        <Typography variant="caption" color="textSecondary">
          Properties
        </Typography>
      </Box>

      {/* Property fields */}
      <Box
        component="form"
        aria-label="Component properties"
        className={styles.content}
      >
        {componentConfig.properties?.map((property: PropertyConfig) => (
          <PropertyField
            key={property.name}
            property={property}
            value={selectedComponent[property.name]}
            onChange={handlePropertyChange(property.name)}
            aria-label={`${property.label} property`}
          />
        ))}
      </Box>
    </Paper>
  );
};
