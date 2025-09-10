import React, { useCallback } from "react";

import type { DragEndEvent } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BuilderDndProvider } from "./BuilderDndProvider";
import { ComponentSidebar } from "./ComponentSidebar";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertiesSidebar } from "./PropertiesSidebar";
import {
  addComponent,
  setSelectedComponent,
} from "../../../features/builder/builderSlice";
import type { ComponentConfig } from "../../../types/builder";
import type { RootState } from "../../../features/store";

function BuilderLayout() {
  const dispatch = useDispatch();
  const activeFormId = useSelector(
    (state: RootState) => state.builder.activeFormId
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over?.id === "builder-canvas" && activeFormId) {
        const componentData = active.data.current as ComponentConfig;
        const dropPoint = event.activatorEvent as PointerEvent;

        // Calculate grid position
        const canvasRect = (over.rect as DOMRect).toJSON();
        const gridX = Math.floor((dropPoint.clientX - canvasRect.left) / 80);
        const gridY = Math.floor((dropPoint.clientY - canvasRect.top) / 80);

        const newComponent = {
          ...componentData,
          id: `${componentData.type}-${Date.now()}`,
          x: gridX,
          y: gridY,
          width: 240, // Default width (3 grid cells)
          height: 80, // Default height
        };

        dispatch(
          addComponent({ formId: activeFormId, component: newComponent })
        );
        dispatch(setSelectedComponent(newComponent.id));
      }
    },
    [dispatch, activeFormId]
  );

  return (
    <BuilderDndProvider onDragEnd={handleDragEnd}>
      <Box
        sx={{ display: "flex", flex: 1, overflow: "hidden", height: "100%" }}
      >
        <ComponentSidebar />
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <BuilderCanvas />
        </Box>
        <PropertiesSidebar />
      </Box>
    </BuilderDndProvider>
  );
}

export { BuilderLayout };
