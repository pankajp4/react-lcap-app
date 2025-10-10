/**
 * @module Atoms
 * @description
 * Property field module that provides a unified interface for editing component properties
 * in the form builder's property panel. Supports multiple input types and validation patterns.
 * @category Input
 * @since 1.0.0
 *
 * @remarks
 * This module provides:
 * - Type-specific input controls
 * - Real-time validation
 * - Material-UI styled components
 * - Consistent error handling
 * - Accessibility support
 *
 * Supported input types:
 * - Text input (single/multi-line)
 * - Number input with validation
 * - Boolean switches
 * - Select dropdowns
 * - Color pickers
 * - Size inputs (width/height)
 *
 * @example
 * ```tsx
 * // Text input property
 * const textProperty = {
 *   type: 'string',
 *   label: 'Label Text',
 *   validation: { required: true, maxLength: 50 }
 * };
 *
 * <PropertyField
 *   property={textProperty}
 *   value="Current Label"
 *   onChange={(value) => updateProperty('label', value)}
 * />
 *
 * // Select dropdown property
 * const alignmentProperty = {
 *   type: 'select',
 *   label: 'Text Alignment',
 *   options: ['left', 'center', 'right']
 * };
 *
 * <PropertyField
 *   property={alignmentProperty}
 *   value="left"
 *   onChange={(value) => updateProperty('alignment', value)}
 * />
 * ```
 */

import type { FC } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import type { PropertyConfig, PropertyOption } from "../../../types/builder";
import styles from "./PropertyField.module.css";

/**
 * Type for property field values
 * @internal
 */
type PropertyValue = string | number | boolean | object | unknown[] | null;

/**
 * Props for the PropertyField component
 * @interface
 * @category Props
 * @since 1.0.0
 */
interface PropertyFieldProps {
  /**
   * The property configuration object.
   * @remarks
   * Includes:
   * - type: The data type of the property
   * - label: Display label for the field
   * - options: Possible values for select fields
   * - validation: Any validation rules
   */
  property: PropertyConfig;

  /**
   * The current value of the property.
   * Type matches the property's configured type in PropertyConfig.
   */
  value: PropertyValue;

  /**
   * Callback function when the property value changes.
   * @param value - The new value, matches property's configured type
   */
  onChange: (value: PropertyValue) => void;
}

/**
 * A dynamic form field component that renders different input types based on the property configuration.
 *
 * @component
 * @category Components
 * @subcategory Input
 */
export const PropertyField: FC<PropertyFieldProps> = ({
  property,
  value,
  onChange,
}) => {
  /**
   * Converts any value to a string safely
   * @param val - The value to convert
   */
  const safeValueToString = (val: PropertyValue): string => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return val.toString();
    if (typeof val === "boolean") return val.toString();
    return JSON.stringify(val);
  };

  /**
   * Renders a text or number input field
   * @param inputType - The type of input ("text", "number", or "color")
   */
  const renderTextInput = (inputType: "text" | "number" | "color") => (
    <TextField
      className={styles.field}
      label={property.label}
      type={inputType}
      value={inputType === "number" ? value || "" : safeValueToString(value)}
      onChange={(e) => {
        const newValue =
          inputType === "number" ? Number(e.target.value) : e.target.value;
        onChange(newValue);
      }}
      fullWidth
      size="small"
      margin="dense"
    />
  );

  /**
   * Renders a select dropdown field
   */
  const renderSelect = () => (
    <FormControl fullWidth size="small" margin="dense">
      <InputLabel>{property.label}</InputLabel>
      <Select
        className={styles.field}
        value={safeValueToString(value)}
        onChange={(e) => onChange(e.target.value)}
        label={property.label}
      >
        {property.options?.map((option: PropertyOption) => (
          <MenuItem
            key={safeValueToString(option.value)}
            value={safeValueToString(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  /**
   * Renders a boolean switch field
   */
  const renderSwitch = () => (
    <FormControlLabel
      className={styles.field}
      control={
        <Switch
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          size="small"
        />
      }
      label={property.label}
    />
  );

  // Handle special cases first
  if (property.options) {
    return renderSelect();
  }

  if (property.name === "color" || property.name === "backgroundColor") {
    return renderTextInput("color");
  }

  // Handle standard property types
  switch (property.type) {
    case "string":
      return renderTextInput("text");
    case "number":
      return renderTextInput("number");
    case "boolean":
      return renderSwitch();
    default:
      // Return null for unsupported property types
      return null;
  }
};
