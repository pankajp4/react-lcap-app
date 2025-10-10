/**
 * @module BuilderTypes
 * @description
 * Core type definitions for the form builder system. This module defines the type hierarchy
 * and interfaces used throughout the application for component configuration, layout,
 * and runtime behavior.
 *
 * @since 1.0.0
 *
 * @remarks
 * The type system is designed around these key concepts:
 * - Component Types: Available form elements
 * - Properties: Configuration options for components
 * - Validation: Rules for data validation
 * - Styling: Visual customization options
 * - API Integration: External data source configuration
 */

/**
 * Available component types in the form builder
 * @category Components
 * @since 1.0.0
 *
 * @remarks
 * Core form elements supported by the builder:
 * - textbox: Single/multi-line text input
 * - select: Dropdown selection
 * - radio: Single-choice radio buttons
 * - checkbox: Multi-select checkboxes
 * - datepicker: Date selection
 * - timepicker: Time selection
 * - grid: Layout container
 * - colorpicker: Color selection
 */
export type ComponentType =
  | "textbox"
  | "select"
  | "radio"
  | "checkbox"
  | "datepicker"
  | "timepicker"
  | "grid"
  | "colorpicker";

/**
 * Categories for organizing components in the builder UI
 * @category Components
 * @since 1.0.0
 *
 * @remarks
 * Components are categorized as:
 * - input: Interactive form elements (textbox, select, etc.)
 * - display: Visual elements (headings, dividers, etc.)
 */
export type ComponentCategory = "input" | "display";

/**
 * Property types for component configuration
 * @category Properties
 * @since 1.0.0
 *
 * @remarks
 * Available property types:
 * - string: Text values
 * - number: Numeric values with optional constraints
 * - boolean: True/false toggles
 * - object: Nested configuration objects
 * - array: Lists of values or objects
 * - date: Date/time values
 */
export type PropertyType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "date";

/**
 * Option configuration for select, radio, and similar components
 * @interface
 * @category Properties
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const options: PropertyOption[] = [
 *   { label: "Option 1", value: "opt1" },
 *   { label: "Option 2", value: 2 },
 *   { label: "Enabled", value: true }
 * ];
 * ```
 */
export interface PropertyOption {
  /** Display text for the option */
  label: string;
  /** Value associated with the option */
  value: string | number | boolean;
}

/**
 * Configuration for a component property
 * @interface
 * @category Properties
 * @since 1.0.0
 *
 * @remarks
 * Defines how a property is configured and rendered in the UI:
 * - Basic properties (name, type, label)
 * - Optional configurations (options, default values)
 * - Type-specific settings
 *
 * @example
 * ```typescript
 * const textProperty: PropertyConfig = {
 *   name: "label",
 *   type: "string",
 *   label: "Label Text",
 *   defaultValue: "Default Label"
 * };
 *
 * const selectProperty: PropertyConfig = {
 *   name: "align",
 *   type: "string",
 *   label: "Alignment",
 *   options: [
 *     { label: "Left", value: "left" },
 *     { label: "Center", value: "center" }
 *   ]
 * };
 * ```
 */
export interface PropertyConfig {
  /** Unique identifier for the property */
  name: string;
  /** Data type of the property */
  type: PropertyType;
  /** Display label in the UI */
  label: string;
  /** Available options for select-type properties */
  options?: PropertyOption[];
  /** Initial value for the property */
  defaultValue?: string | number | boolean | object | unknown[];
}

/**
 * Complete configuration for a form component
 * @interface
 * @category Components
 * @since 1.0.0
 *
 * @remarks
 * Defines all aspects of a form component:
 * - Basic information (type, category, label)
 * - Visual properties (icon, style)
 * - Behavior configuration (validation, API integration)
 * - Custom properties
 *
 * @example
 * ```typescript
 * const textInput: ComponentConfig = {
 *   type: "textbox",
 *   category: "input",
 *   label: "Name Input",
 *   icon: "text_fields",
 *   props: {
 *     placeholder: "Enter your name"
 *   },
 *   validation: {
 *     required: true,
 *     maxLength: 50
 *   }
 * };
 * ```
 */
export interface ComponentConfig {
  /** Component type identifier */
  type: ComponentType;
  /** Organizational category */
  category: ComponentCategory;
  /** Display label */
  label: string;
  /** Material-UI icon identifier */
  icon: string;
  /** Component-specific properties */
  props: Record<string, unknown>;
  /** Visual styling configuration */
  style?: {
    width?: string | number;
    height?: string | number;
    margin?: string | number;
    padding?: string | number;
    backgroundColor?: string;
    color?: string;
    [key: string]: string | number | undefined;
  };
  /** Data validation rules */
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    [key: string]: string | number | boolean | undefined;
  };
  /** External API integration settings */
  api?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    endpoint?: string;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
  };
  /** Custom property configurations */
  properties?: PropertyConfig[];
}

/**
 * Runtime component instance with position and size information
 * @interface
 * @category Components
 * @since 1.0.0
 *
 * @remarks
 * Extends ComponentConfig to add:
 * - Unique identifier
 * - Position coordinates
 * - Dimensions
 * - Runtime styling
 *
 * This interface represents a component instance in the form canvas,
 * combining the static configuration with runtime properties.
 *
 * @example
 * ```typescript
 * const textboxInstance: BuilderComponent = {
 *   id: "text-1",
 *   type: "textbox",
 *   category: "input",
 *   label: "Name",
 *   icon: "text_fields",
 *   x: 100,
 *   y: 200,
 *   width: 200,
 *   height: 40,
 *   props: {
 *     placeholder: "Enter name"
 *   },
 *   style: {
 *     backgroundColor: "#ffffff",
 *     fontSize: 16
 *   }
 * };
 * ```
 */
export interface BuilderComponent extends ComponentConfig {
  /** Unique identifier for the component instance */
  id: string;
  /** Horizontal position in canvas */
  x: number;
  /** Vertical position in canvas */
  y: number;
  /** Component width in pixels */
  width: number;
  /** Component height in pixels */
  height: number;
  /** Runtime styling overrides */
  style?: {
    /** Background color in CSS format */
    backgroundColor?: string;
    /** Component width with units */
    width?: string | number;
    /** Component height with units */
    height?: string | number;
    /** Margin with CSS units */
    margin?: string | number;
    /** Padding with CSS units */
    padding?: string | number;
    /** Text color in CSS format */
    color?: string;
    /** Font size with units */
    fontSize?: string | number;
    /** Font weight value */
    fontWeight?: string | number;
    /** Allow for additional CSS properties */
    [key: string]: string | number | undefined;
  };
  /** Runtime API configuration */
  api?: {
    /** HTTP method for the API call */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    /** API endpoint URL */
    endpoint?: string;
    /** Custom HTTP headers */
    headers?: Record<string, string>;
  };
  /** Runtime validation rules */
  validation?: {
    /** Whether the field is required */
    required?: boolean;
    /** Minimum text length */
    minLength?: number;
    /** Maximum text length */
    maxLength?: number;
    /** Regular expression pattern */
    pattern?: string;
    /** Allow for additional validation rules */
    [key: string]: any;
  };
  /** Allow for additional runtime properties */
  [key: string]: any;
}

/**
 * Complete form configuration including components and settings
 * @interface
 * @category Forms
 * @since 1.0.0
 *
 * @remarks
 * Top-level configuration for a form, including:
 * - Basic form information
 * - Component collection
 * - Layout settings
 * - Theme configuration
 * - Validation rules
 * - API integration
 *
 * This interface represents the complete serializable state of a form
 * that can be saved, loaded, and rendered.
 *
 * @example
 * ```typescript
 * const loginForm: FormConfig = {
 *   id: "login-form",
 *   name: "Login Form",
 *   description: "User authentication form",
 *   components: [
 *     // Username field
 *     {
 *       id: "username",
 *       type: "textbox",
 *       label: "Username",
 *       x: 0,
 *       y: 0,
 *       width: 200,
 *       height: 40
 *     },
 *     // Password field
 *     {
 *       id: "password",
 *       type: "textbox",
 *       label: "Password",
 *       x: 0,
 *       y: 50,
 *       width: 200,
 *       height: 40
 *     }
 *   ],
 *   layout: {
 *     type: "flex",
 *     gap: 10
 *   },
 *   theme: {
 *     primaryColor: "#1976d2",
 *     secondaryColor: "#dc004e",
 *     backgroundColor: "#ffffff"
 *   },
 *   api: {
 *     endpoint: "/api/auth/login",
 *     method: "POST"
 *   }
 * };
 * ```
 */
export interface FormConfig {
  /** Unique identifier for the form */
  id: string;
  /** Display name of the form */
  name: string;
  /** Optional form description */
  description?: string;
  /** Array of form components */
  components: BuilderComponent[];
  /** Layout configuration */
  layout: {
    /** Layout system to use */
    type: "grid" | "flex";
    /** Space between components */
    gap: number;
    /** Number of columns for grid layout */
    columns?: number;
  };
  /** Theme configuration */
  theme?: {
    /** Primary brand color */
    primaryColor: string;
    /** Secondary brand color */
    secondaryColor: string;
    /** Form background color */
    backgroundColor: string;
  };
  /** Form-level validation rules */
  validation?: Record<string, any>;
  /** Form submission configuration */
  api?: {
    /** API endpoint URL */
    endpoint: string;
    /** HTTP method for form submission */
    method: "GET" | "POST" | "PUT" | "DELETE";
    /** Custom HTTP headers */
    headers?: Record<string, string>;
  };
}
