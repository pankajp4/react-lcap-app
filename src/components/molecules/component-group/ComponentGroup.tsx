/**
 * @module Molecules
 * @description
 * Component group module for organizing and displaying related form components
 * in a collapsible accordion structure.
 * @category FormBuilder
 */

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useState } from "react";

import type { ComponentConfig } from "../../../types/builder";
import { DraggableComponent } from "../../atoms";

/**
 * Props for the ComponentGroup component
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * The ComponentGroup serves as a container for organizing related form components
 * in the form builder's component sidebar. It uses Material-UI's Accordion component
 * to provide a collapsible section that helps manage space and improve navigation.
 *
 * Each group contains:
 * - A header with the group title and expand/collapse control
 * - A content area with draggable components
 * - Visual feedback for hover and active states
 */
interface ComponentGroupProps {
  /**
   * The title displayed in the accordion header.
   * Should be descriptive of the component category (e.g., "Input Fields", "Buttons").
   */
  title: string;

  /**
   * Array of component configurations to be displayed as draggable items.
   * Each configuration defines the type, label, and icon for a form component.
   *
   * @remarks
   * The components are rendered using the DraggableComponent atom,
   * which enables drag-and-drop functionality for form building.
   */
  components: ComponentConfig[];
}

/**
 * A collapsible group of draggable form components.
 *
 * @component
 * @category Components
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * The ComponentGroup creates an expandable/collapsible section using Material-UI's
 * Accordion component. It's designed to organize related form components in the
 * builder's sidebar, making it easier for users to find and use components.
 *
 * Features:
 * - Collapsible header with group title and component count
 * - Persistent expansion state
 * - Smooth animation for expand/collapse
 * - Visual feedback for interaction states
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * // Basic usage with input field components
 * <ComponentGroup
 *   title="Input Fields"
 *   components={[
 *     { type: "textbox", label: "Text Input", icon: "TextFields" },
 *     { type: "number", label: "Number Input", icon: "Numbers" }
 *   ]}
 * />
 *
 * // Usage with button components
 * <ComponentGroup
 *   title="Buttons"
 *   components={[
 *     { type: "button", label: "Button", icon: "SmartButton" },
 *     { type: "submit", label: "Submit Button", icon: "Send" }
 *   ]}
 * />
 * ```
 */
export const ComponentGroup = ({ title, components }: ComponentGroupProps) => {
  /**
   * State to track whether the accordion is expanded
   * @defaultValue true
   */
  const [expanded, setExpanded] = useState(true);

  /**
   * Toggle the expanded state of the accordion
   * @callback
   * @remarks
   * Called when the user clicks the accordion header or uses keyboard navigation.
   * Updates the expanded state and triggers the accordion animation.
   */
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  /**
   * Render the component group as an accordion section
   * @returns {JSX.Element} A Material-UI Accordion containing the component group
   */
  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpand}
      sx={{
        marginBottom: 1,
        boxShadow: "none",
        border: 1,
        borderColor: "divider",
      }}
    >
      {/* Accordion header with group title and component count */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label={`${title} component group`}
        sx={{
          minHeight: "48px",
          "& .MuiAccordionSummary-content": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          },
        }}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" color="textSecondary">
          {components.length} components
        </Typography>
      </AccordionSummary>

      {/* Grid of draggable components */}
      <AccordionDetails
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {components.map((component) => (
          <DraggableComponent
            key={component.type}
            component={component}
            aria-label={`Draggable ${component.label}`}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
