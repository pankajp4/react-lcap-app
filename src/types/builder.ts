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

export interface ComponentConfig {
  type: ComponentType;
  category: ComponentCategory;
  label: string;
  icon: string;
  props: Record<string, any>;
  style?: Record<string, any>;
  validation?: Record<string, any>;
  api?: Record<string, any>;
}

export interface BuilderComponent extends ComponentConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: {
    backgroundColor?: string;
    [key: string]: any;
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
