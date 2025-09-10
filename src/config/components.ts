import type { ComponentConfig } from "../types/builder";

/**
 * Configuration for all available components in the builder
 * Each component has its own set of properties and configurations
 */
export const availableComponents: ComponentConfig[] = [
  {
    type: "textbox",
    category: "input",
    label: "Text Input",
    icon: "TextFields",
    props: {
      variant: ["outlined", "filled", "standard"],
      type: ["text", "number", "email", "tel", "password", "currency"],
      size: ["small", "medium", "large"],
      required: Boolean,
      disabled: Boolean,
      placeholder: String,
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
