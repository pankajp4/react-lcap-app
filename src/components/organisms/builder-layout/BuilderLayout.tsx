/**
 * @fileoverview
 * BuilderLayout organism component.
 * Wrapper component that renders the UIBuilder page within the application layout.
 *
 * @module Components/Organisms/BuilderLayout
 * @category Layout
 * @since 1.0.0
 */

import React from "react";

import { UIBuilder } from "@pages/ui-builder";

/**
 * BuilderLayout component
 * @description
 * Layout wrapper for the UI Builder page. Acts as a bridge between
 * the component hierarchy and the page routing system.
 *
 * @component
 * @returns The UIBuilder component wrapped in the layout
 *
 * @example
 * ```tsx
 * <BuilderLayout />
 * ```
 */
export const BuilderLayout: React.FC = () => {
  return <UIBuilder />;
};
