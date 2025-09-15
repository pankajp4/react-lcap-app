/**
 * Type definitions for the form builder components and configurations
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

export type ComponentCategory = "input" | "display";

export type PropertyType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "date";

export interface PropertyOption {
  label: string;
  value: string | number | boolean;
}

export interface PropertyConfig {
  name: string;
  type: PropertyType;
  label: string;
  options?: PropertyOption[];
  defaultValue?: string | number | boolean | object | unknown[];
}

export interface ComponentConfig {
  type: ComponentType;
  category: ComponentCategory;
  label: string;
  icon: string;
  props: Record<string, unknown>;
  style?: {
    width?: string | number;
    height?: string | number;
    margin?: string | number;
    padding?: string | number;
    backgroundColor?: string;
    color?: string;
    [key: string]: string | number | undefined;
  };
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    [key: string]: string | number | boolean | undefined;
  };
  api?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    endpoint?: string;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
  };
  properties?: PropertyConfig[];
}

export interface BuilderComponent extends ComponentConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: {
    backgroundColor?: string;
    width?: string | number;
    height?: string | number;
    margin?: string | number;
    padding?: string | number;
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    [key: string]: string | number | undefined;
  };
  api?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    endpoint?: string;
    headers?: Record<string, string>;
  };
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface FormConfig {
  id: string;
  name: string;
  description?: string;
  components: BuilderComponent[];
  layout: {
    type: "grid" | "flex";
    gap: number;
    columns?: number;
  };
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  };
  validation?: Record<string, any>;
  api?: {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
  };
}
