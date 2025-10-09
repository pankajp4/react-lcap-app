import type { BaseComponent } from "./types";
import { componentRegistry } from "./componentRegistry";

const generateImports = (components: BaseComponent[]): string => {
  const usedComponents = new Set(components.map((c) => c.type));
  return `import React from 'react';
import { 
  ${Array.from(usedComponents).join(",\n  ")}
} from '@mui/material';`;
};

const generateProps = (props: Record<string, any>): string => {
  return Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      if (typeof value === "boolean") {
        return value ? key : "";
      }
      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean)
    .join(" ");
};

const generateComponentTree = (
  component: BaseComponent,
  indent: number = 0
): string => {
  const componentDef = componentRegistry
    .flatMap((group) => group.components)
    .find((c) => c.type === component.type);

  if (!componentDef) return "";

  const spacing = "  ".repeat(indent);
  const props = generateProps(component.props);
  const propsStr = props ? ` ${props}` : "";

  if (!component.children?.length) {
    return `${spacing}<${componentDef.name}${propsStr} />`;
  }

  return `${spacing}<${componentDef.name}${propsStr}>
${component.children
  .map((child) => generateComponentTree(child, indent + 1))
  .join("\n")}
${spacing}</${componentDef.name}>`;
};

const generateCode = (components: BaseComponent[]): string => {
  const imports = generateImports(components);
  const jsx = components
    .map((comp) => generateComponentTree(comp, 2))
    .join("\n");

  return `${imports}

const GeneratedComponent: React.FC = () => {
  return (
${jsx}
  );
};

export default GeneratedComponent;`;
};

export const exportToCode = (components: BaseComponent[]): string => {
  return generateCode(components);
};

export const exportToFile = async (
  components: BaseComponent[]
): Promise<string> => {
  const code = generateCode(components);
  // You would typically use a file system API here
  console.log("Generated code:", code);
  return code;
};
