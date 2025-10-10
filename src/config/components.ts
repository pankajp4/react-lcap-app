/**
 * @module Config
 * @description
 * Configuration module that defines all available form components and their properties
 * in the form builder system.
 * @category Components
 */

import type { ComponentConfig } from "../types/builder";

/**
 * Configuration array for all available components in the form builder.
 * Each component is defined with its type, category, properties, and validations.
 *
 * @constant
 * @category Configuration
 * @since 1.0.0
 *
 * @remarks
 * This configuration defines the complete set of components available in the form builder.
 * Each component is described with:
 * - Basic information (type, category, label, icon)
 * - Available properties and their types
 * - Validation rules
 * - Style configurations
 * - Event handlers
 * - Default values
 *
 * The configuration is used by:
 * - ComponentSidebar to display available components
 * - PropertiesSidebar to show editable properties
 * - BuilderCanvas to render components correctly
 *
 * @example
 * ```typescript
 * // Using the configuration to filter components by category
 * const inputComponents = availableComponents.filter(
 *   comp => comp.category === 'input'
 * );
 *
 * // Getting component properties
 * const textboxConfig = availableComponents.find(
 *   comp => comp.type === 'textbox'
 * );
 * ```
 */
export const availableComponents: ComponentConfig[] = [
  {
    type: "textbox",
    category: "input",
    label: "Text Input",
    icon: "TextFields",
    props: {
      // Basic props
      label: "",
      placeholder: "",
      helperText: "",
      type: "text" as
        | "text"
        | "password"
        | "email"
        | "tel"
        | "currency"
        | "number"
        | "decimal"
        | "url"
        | "search",
      variant: "outlined" as "outlined" | "filled" | "standard",
      size: "medium" as "small" | "medium",
      required: false,
      disabled: false,
      readOnly: false,
      fullWidth: true,
      autoFocus: false,

      // Validation props
      minLength: 0,
      maxLength: 0,
      pattern: "",
      min: 0,
      max: 0,

      // Currency props
      currency: "USD" as "USD" | "EUR" | "GBP" | "INR" | "JPY",
      locale: "",
      decimals: 2,

      // Style props
      className: "",
      inputClassName: "",

      // API props
      apiEndpoint: "",
      apiMethod: "GET" as "GET" | "POST" | "PUT" | "PATCH",
      apiHeaders: {} as Record<string, string>,

      // Additional props
      tooltip: "",
      infoTooltip: "",
    },
    style: {
      width: 200,
      height: 40,
      margin: "0",
      padding: "8px",
      backgroundColor: "#ffffff",
      borderColor: "#cccccc",
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      color: "#000000",
    },
    validation: {
      required: false,
      minLength: 0,
      maxLength: 100,
      pattern: "",
      customValidation: "",
    },
    api: {
      endpoint: "",
      method: "POST",
      headers: {} as Record<string, string>,
      params: {} as Record<string, string | number | boolean>,
    },
  },
  {
    type: "select",
    category: "input",
    label: "Dropdown",
    icon: "ArrowDropDown",
    props: {
      variant: ["outlined", "filled", "standard"],
      size: ["small", "medium", "large"],
      multiple: Boolean,
      required: Boolean,
      disabled: Boolean,
    },
  },
  {
    type: "radio",
    category: "input",
    label: "Radio Group",
    icon: "RadioButtonChecked",
    props: {
      row: Boolean,
      disabled: Boolean,
      required: Boolean,
    },
  },
  {
    type: "checkbox",
    category: "input",
    label: "Checkbox",
    icon: "CheckBox",
    props: {
      disabled: Boolean,
      required: Boolean,
      indeterminate: Boolean,
    },
  },
  {
    type: "datepicker",
    category: "input",
    label: "Date Picker",
    icon: "CalendarToday",
    props: {
      variant: ["outlined", "filled", "standard"],
      format: String,
      disabled: Boolean,
      required: Boolean,
    },
  },
  {
    type: "timepicker",
    category: "input",
    label: "Time Picker",
    icon: "Schedule",
    props: {
      variant: ["outlined", "filled", "standard"],
      format: String,
      disabled: Boolean,
      required: Boolean,
    },
  },
  {
    type: "grid",
    category: "display",
    label: "Data Grid",
    icon: "GridOn",
    props: {
      pagination: Boolean,
      sorting: Boolean,
      filtering: Boolean,
      rowsPerPage: [5, 10, 25, 50, 100],
    },
  },
  {
    type: "colorpicker",
    category: "input",
    label: "Color Picker",
    icon: "Palette",
    props: {
      disabled: Boolean,
      format: ["hex", "rgb", "hsl"],
    },
  },
];
