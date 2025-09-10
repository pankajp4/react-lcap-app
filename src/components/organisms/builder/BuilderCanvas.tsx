import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import type { BuilderComponent } from "../../../types/builder";
import type { RootState } from "../../../features/store";
import {
  updateComponent,
  setSelectedComponent,
} from "../../../features/builder/builderSlice";
import { DroppableComponent } from "../../atoms/display/DroppableComponent";
import styles from "./BuilderCanvas.module.css";

/**
 * The main canvas where components can be dropped and arranged
 * Handles component placement, selection, and resizing
 */
export const BuilderCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const activeFormId = useSelector(
    (state: RootState) => state.builder.activeFormId
  );
  const components = useSelector((state: RootState) => {
    const activeForm = state.builder.forms.find(
      (form: { id: string }) => form.id === activeFormId
    );
    return activeForm?.components || [];
  });

  const { setNodeRef, isOver } = useDroppable({
    id: "builder-canvas",
  });

  const handleComponentSelect = useCallback(
    (id: string) => {
      dispatch(setSelectedComponent(id));
    },
    [dispatch]
  );

  const handleComponentResize = useCallback(
    (id: string, width: number, height: number) => {
      if (activeFormId) {
        dispatch(
          updateComponent({
            formId: activeFormId,
            componentId: id,
            updates: { width, height },
          })
        );
      }
    },
    [dispatch, activeFormId]
  );

  if (!activeFormId) {
    return (
      <div className={styles.canvasContainer}>
        <div className={styles.dropArea}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <Typography>Select or create a form to start building</Typography>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.canvasContainer}>
      <div
        ref={setNodeRef}
        className={`${styles.dropArea} ${isOver ? styles.over : ""}`}
      >
        <div className={styles.grid}>
          {(components as BuilderComponent[]).map((component) => (
            <DroppableComponent
              key={component.id}
              component={component}
              onSelect={handleComponentSelect}
              onResize={handleComponentResize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
