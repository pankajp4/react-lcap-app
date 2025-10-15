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
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import ComponentRenderer from "./ComponentRenderer";
import type { BaseComponent } from "../../../../store/builder/types";

const PreviewOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1a202c;
  color: white;
`;

const PreviewTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const PreviewContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 2rem;
`;

const ViewportSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
`;

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

  const getViewportWidth = () => {
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
    <PreviewOverlay isOpen={isOpen}>
      <PreviewHeader>
        <PreviewTitle>Preview</PreviewTitle>
        <ViewportSelector>
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
        </ViewportSelector>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Close Preview
        </Button>
      </PreviewHeader>
      <PreviewContent>
        <div
          style={{
            maxWidth: getViewportWidth(),
            margin: "0 auto",
            transition: "max-width 0.3s ease-in-out",
          }}
        >
          {components.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </div>
      </PreviewContent>
    </PreviewOverlay>
  );
};

export default PreviewWindow;
