export interface BaseComponent {
  id: string;
  type: string;
  name: string;
  children?: BaseComponent[];
  props: Record<string, any>;
}

export interface ComponentGroup {
  name: string;
  components: ComponentDefinition[];
}

export interface ComponentDefinition {
  type: string;
  name: string;
  icon?: string;
  defaultProps: Record<string, any>;
  allowedChildren?: string[];
  properties: PropertyDefinition[];
}

export interface PropertyDefinition {
  name: string;
  type: "string" | "number" | "boolean" | "select" | "color";
  label: string;
  options?: string[];
  default?: any;
}

export const COMPONENT_TYPES = {
  LAYOUT: "layout",
  FORM: "form",
  DATA: "data",
  DISPLAY: "display",
} as const;
