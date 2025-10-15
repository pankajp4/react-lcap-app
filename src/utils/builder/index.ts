/**
 * @module Utils/Builder
 * @description
 * Central export point for UI builder utilities
 * @category Utils
 */

export { default as HistoryManager } from "./historyManager";
export { default as customComponentManager } from "./customComponentManager";
export { componentRegistry } from "./componentRegistry";
export { exportToCode } from "./codeExporter";

export type { CustomTemplate, TemplateVersion } from "./customComponentManager";
export type { HistoryState } from "./historyManager";
