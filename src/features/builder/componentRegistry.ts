import type { ComponentGroup } from "./types";

export const componentRegistry: ComponentGroup[] = [
  {
    name: "Layout",
    components: [
      {
        type: "container",
        name: "Container",
        defaultProps: {
          padding: "1rem",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
        },
        properties: [
          {
            name: "padding",
            type: "string",
            label: "Padding",
            default: "1rem",
          },
          {
            name: "maxWidth",
            type: "string",
            label: "Max Width",
            default: "100%",
          },
          {
            name: "display",
            type: "select",
            label: "Display",
            options: ["flex", "block", "grid"],
            default: "flex",
          },
          {
            name: "flexDirection",
            type: "select",
            label: "Direction",
            options: ["row", "column"],
            default: "column",
          },
        ],
        allowedChildren: ["*"],
      },
      {
        type: "grid",
        name: "Grid",
        defaultProps: {
          columns: 2,
          gap: "1rem",
        },
        properties: [
          {
            name: "columns",
            type: "number",
            label: "Columns",
            default: 2,
          },
          {
            name: "gap",
            type: "string",
            label: "Gap",
            default: "1rem",
          },
        ],
        allowedChildren: ["*"],
      },
    ],
  },
  {
    name: "Form",
    components: [
      {
        type: "form",
        name: "Form",
        defaultProps: {
          method: "POST",
          padding: "1rem",
        },
        properties: [
          {
            name: "method",
            type: "select",
            label: "Method",
            options: ["GET", "POST", "PUT", "DELETE"],
            default: "POST",
          },
          {
            name: "action",
            type: "string",
            label: "Action URL",
          },
        ],
        allowedChildren: ["input", "select", "button"],
      },
      {
        type: "input",
        name: "Input Field",
        defaultProps: {
          type: "text",
          placeholder: "Enter text...",
          required: false,
        },
        properties: [
          {
            name: "type",
            type: "select",
            label: "Type",
            options: ["text", "number", "email", "password", "date"],
            default: "text",
          },
          {
            name: "placeholder",
            type: "string",
            label: "Placeholder",
          },
          {
            name: "required",
            type: "boolean",
            label: "Required",
            default: false,
          },
        ],
      },
      {
        type: "button",
        name: "Button",
        defaultProps: {
          variant: "contained",
          color: "primary",
          text: "Submit",
        },
        properties: [
          {
            name: "variant",
            type: "select",
            label: "Variant",
            options: ["contained", "outlined", "text"],
            default: "contained",
          },
          {
            name: "color",
            type: "select",
            label: "Color",
            options: ["primary", "secondary", "error"],
            default: "primary",
          },
          {
            name: "text",
            type: "string",
            label: "Text",
            default: "Submit",
          },
        ],
      },
    ],
  },
  {
    name: "Data Display",
    components: [
      {
        type: "table",
        name: "Table",
        defaultProps: {
          columns: [],
          data: [],
          striped: true,
          hoverable: true,
        },
        properties: [
          {
            name: "striped",
            type: "boolean",
            label: "Striped Rows",
            default: true,
          },
          {
            name: "hoverable",
            type: "boolean",
            label: "Hover Effect",
            default: true,
          },
        ],
      },
      {
        type: "card",
        name: "Card",
        defaultProps: {
          elevation: 1,
          padding: "1rem",
        },
        properties: [
          {
            name: "elevation",
            type: "number",
            label: "Elevation",
            default: 1,
          },
          {
            name: "padding",
            type: "string",
            label: "Padding",
            default: "1rem",
          },
        ],
        allowedChildren: ["*"],
      },
    ],
  },
];
