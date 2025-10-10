/**
 * @module Organisms
 * @description
 * Root layout component for the form builder interface.
 * Organizes the main workspace into a responsive three-column layout.
 * @category FormBuilder
 */

import { BuilderCanvas } from "../builder-canvas/BuilderCanvas";
import { BuilderDndProvider } from "../builder-dnd-provider/BuilderDndProvider";
import { ComponentSidebar } from "../component-sidebar/ComponentSidebar";
import { PropertiesSidebar } from "../properties-sidebar/PropertiesSidebar";
import styles from "./BuilderLayout.module.css";

/**
 * Main layout component for the form builder interface.
 *
 * @component
 * @category Layout
 * @subcategory FormBuilder
 * @since 1.0.0
 *
 * @remarks
 * The BuilderLayout is the root container that organizes the form builder's
 * main interface. It implements a responsive three-column layout design with:
 *
 * Left Column (Component Palette):
 * - Lists available form components
 * - Organized in collapsible groups
 * - Draggable components for form building
 *
 * Center Column (Canvas):
 * - Main form building area
 * - Drop zone for components
 * - Visual grid for alignment
 * - Component selection and positioning
 *
 * Right Column (Properties Panel):
 * - Shows selected component properties
 * - Property editing interface
 * - Component-specific settings
 *
 * Features:
 * - Responsive layout adaptation
 * - Proper ARIA labeling for accessibility
 * - Integrated drag and drop context
 * - CSS Grid-based layout system
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BuilderLayout />
 *
 * // Within a page or larger application
 * function FormBuilderPage() {
 *   return (
 *     <div className="page">
 *       <TopNavbar />
 *       <BuilderLayout />
 *     </div>
 *   );
 * }
 * ```
 */
export const BuilderLayout = () => {
  return (
    <BuilderDndProvider>
      <div className={styles.layout}>
        {/* Left sidebar with draggable components */}
        <aside className={styles.sidebar} aria-label="Component palette">
          <ComponentSidebar />
        </aside>

        {/* Main canvas area */}
        <main className={styles.canvas} aria-label="Form canvas">
          <BuilderCanvas />
        </main>

        {/* Right sidebar with component properties */}
        <aside className={styles.sidebar} aria-label="Properties panel">
          <PropertiesSidebar />
        </aside>
      </div>
    </BuilderDndProvider>
  );
};
