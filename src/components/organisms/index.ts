/**
 * @module Organisms
 * @description
 * Organism components represent complex UI sections composed of molecules and atoms.
 * These are the largest and most complex components in the atomic design hierarchy.
 */

/**
 * Core Builder Components
 * @category FormBuilder/Core
 * @description
 * Core layout and provider components that establish the form builder structure
 */
export { BuilderLayout } from "./builder-layout/BuilderLayout";
export { BuilderDndProvider } from "./builder-dnd-provider/BuilderDndProvider";

/**
 * Builder Interface Components
 * @category FormBuilder/Interface
 * @description
 * Main interface components that handle form construction and property editing.
 * These components work together to create the complete form builder interface:
 * - BuilderCanvas: Main drag-and-drop area for form construction
 * - ComponentSidebar: Lists available components for form building
 * - PropertiesSidebar: Displays and edits selected component properties
 * - TopNavbar: Contains form actions and navigation controls
 */
export { BuilderCanvas } from "./builder-canvas/BuilderCanvas";
export { ComponentSidebar } from "./component-sidebar/ComponentSidebar";
export { PropertiesSidebar } from "./properties-sidebar/PropertiesSidebar";
export { TopNavbar } from "./top-navbar/TopNavbar";
