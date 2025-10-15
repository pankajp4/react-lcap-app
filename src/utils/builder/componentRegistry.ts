import type { ComponentGroup } from "@store/builder/types";

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
        type: "Textbox",
        name: "Input Field",
        defaultProps: {
          type: "text",
          placeholder: "Enter text...",
          required: false,
          fullWidth: true,
        },
        properties: [
          {
            name: "type",
            type: "select",
            label: "Type",
            options: [
              "text",
              "number",
              "password",
              "email",
              "tel",
              "search",
              "url",
            ],
            default: "text",
          },
          {
            name: "label",
            type: "string",
            label: "Label",
          },
          {
            name: "placeholder",
            type: "string",
            label: "Placeholder",
          },
          {
            name: "helperText",
            type: "string",
            label: "Helper Text",
          },
          {
            name: "required",
            type: "boolean",
            label: "Required",
            default: false,
          },
          {
            name: "disabled",
            type: "boolean",
            label: "Disabled",
            default: false,
          },
          {
            name: "autoFocus",
            type: "boolean",
            label: "Auto Focus",
            default: false,
          },
          {
            name: "fullWidth",
            type: "boolean",
            label: "Full Width",
            default: true,
          },
          {
            name: "multiline",
            type: "boolean",
            label: "Multiline",
            default: false,
          },
          {
            name: "rows",
            type: "number",
            label: "Rows",
            default: 1,
          },
          {
            name: "maxRows",
            type: "number",
            label: "Max Rows",
          },
          {
            name: "minRows",
            type: "number",
            label: "Min Rows",
          },
          {
            name: "maxLength",
            type: "number",
            label: "Max Length",
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
