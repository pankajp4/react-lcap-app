import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import type { BuilderComponent } from "../../../../types/builder";
import type { RootState } from "../../../../features/store";
import {
  updateComponent,
  setSelectedComponent,
} from "../../../../features/builder/builderSlice";
import { DroppableComponent } from "../../../atoms";
import styles from "./BuilderCanvas.module.css";

export const BuilderCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const { isOver, setNodeRef } = useDroppable({
    id: "builder-canvas",
  });

  const activeForm = useSelector((state: RootState) => {
    const activeFormId = state.builder.activeFormId;
    return activeFormId
      ? state.builder.forms.find((f) => f.id === activeFormId)
      : null;
  });

  const handleSelect = useCallback(
    (id: string) => {
      dispatch(setSelectedComponent(id));
    },
    [dispatch]
  );

  const handleDeselect = useCallback(() => {
    dispatch(setSelectedComponent(null));
  }, [dispatch]);

  const handleComponentResize = useCallback(
    (id: string) => (width: number, height: number) => {
      dispatch(
        updateComponent({
          id,
          changes: {
            style: {
              width: `${width}px`,
              height: `${height}px`,
            },
          },
        })
      );
    },
    [dispatch]
  );

  if (!activeForm) {
    return (
      <Box className={styles.emptyCanvas}>
        <Typography variant="body1" color="textSecondary">
          Select or create a form to start building
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      className={`${styles.canvas} ${isOver ? styles.dragOver : ""}`}
    >
      {activeForm.components?.map((component: BuilderComponent) => (
        <DroppableComponent
          key={component.id}
          component={component}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          onResize={handleComponentResize(component.id)}
        />
      ))}
      {activeForm.components?.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          className={styles.emptyMessage}
        >
          Drag and drop components here
        </Typography>
      )}
    </Box>
  );
};
