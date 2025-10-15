/**
 * @fileoverview
 * PreviewWindow component for the UI Builder.
 * Provides a full-screen preview of the built UI components.
 *
 * @module Pages/UIBuilder/Components/PreviewWindow
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { Button } from "@mui/material";
import ComponentRenderer from "../component-renderer";
import type { BaseComponent } from "../../../../../store/builder/types";
import styles from "./PreviewWindow.module.css";

interface PreviewWindowProps {
  isOpen: boolean;
  onClose: () => void;
  components: BaseComponent[];
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({
  isOpen,
  onClose,
  components,
}) => {
  const [viewport, setViewport] = React.useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const getViewportClass = () => {
    switch (viewport) {
      case "mobile":
        return styles.viewportMobile;
      case "tablet":
        return styles.viewportTablet;
      default:
        return styles.viewportDesktop;
    }
  };

  return (
    <div className={`${styles.overlay} ${!isOpen ? styles.overlayHidden : ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Preview</h2>
        <div className={styles.viewportSelector}>
          <Button
            variant={viewport === "desktop" ? "contained" : "text"}
            color="inherit"
            onClick={() => setViewport("desktop")}
          >
            Desktop
          </Button>
          <Button
            variant={viewport === "tablet" ? "contained" : "text"}
            color="inherit"
            onClick={() => setViewport("tablet")}
          >
            Tablet
          </Button>
          <Button
            variant={viewport === "mobile" ? "contained" : "text"}
            color="inherit"
            onClick={() => setViewport("mobile")}
          >
            Mobile
          </Button>
        </div>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Close Preview
        </Button>
      </div>
      <div className={styles.content}>
        <div className={`${styles.viewportContainer} ${getViewportClass()}`}>
          {components.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;
