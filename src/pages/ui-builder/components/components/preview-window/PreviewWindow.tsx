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
import { Button, Box, Typography, ButtonGroup } from "@mui/material";
import ComponentRenderer from "@pages/ui-builder/components/components/component-renderer";
import type { BaseComponent } from "@store/builder/types";
import styles from "@pages/ui-builder/components/components/preview-window/PreviewWindow.module.css";

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
    <Box className={`${styles.overlay} ${!isOpen ? styles.overlayHidden : ""}`}>
      <Box className={styles.header}>
        <Typography variant="h5" component="h2" className={styles.title}>
          Preview
        </Typography>
        <ButtonGroup className={styles.viewportSelector}>
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
        </ButtonGroup>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Close Preview
        </Button>
      </Box>
      <Box className={styles.content}>
        <Box className={`${styles.viewportContainer} ${getViewportClass()}`}>
          {components.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewWindow;
