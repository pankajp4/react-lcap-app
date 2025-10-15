/**
 * @module Utils/Builder
 * @description
 * Central export point for UI builder utilities
 * @category Utils
 */

export { default as HistoryManager } from "@utils/builder/historyManager";
export { default as customComponentManager } from "@utils/builder/customComponentManager";
export { componentRegistry } from "@utils/builder/componentRegistry";
export { exportToCode } from "@utils/builder/codeExporter";

export type {
  CustomTemplate,
  TemplateVersion,
} from "@utils/builder/customComponentManager";
export type { HistoryState } from "@utils/builder/historyManager";
