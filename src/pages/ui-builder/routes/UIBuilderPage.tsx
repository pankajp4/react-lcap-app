/**
 * @fileoverview
 * UIBuilderPage route component.
 * Entry point page for the UI Builder feature.
 *
 * @module Pages/UIBuilder/Routes/UIBuilderPage
 * @category Pages
 * @since 1.0.0
 */

import React from "react";
import UIBuilder from "../components/components/UIBuilder";

/**
 * UIBuilderPage component
 * @description
 * Route component that renders the main UI Builder interface.
 * Acts as a simple wrapper around the UIBuilder component.
 *
 * @component
 * @returns {React.ReactElement} The UIBuilder component
 *
 * @example
 * ```tsx
 * // In router configuration
 * <Route path="/ui-builder" element={<UIBuilderPage />} />
 * ```
 */
const UIBuilderPage: React.FC = () => {
  return <UIBuilder />;
};

export default UIBuilderPage;
