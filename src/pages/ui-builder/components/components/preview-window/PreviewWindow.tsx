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
import ComponentRenderer from "../component-renderer";
import type { BaseComponent } from "../../../../../store/builder/types";

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

  const getViewportMaxWidth = () => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        zIndex: 1000,
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          minHeight: "64px",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "white",
          }}
        >
          Preview
        </Typography>
        <ButtonGroup
          sx={{
            display: "flex",
            gap: "12px",
            marginRight: "24px",
          }}
        >
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
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: 4,
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: getViewportMaxWidth(),
            transition: "max-width 0.5s",
          }}
        >
          {components.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewWindow;
