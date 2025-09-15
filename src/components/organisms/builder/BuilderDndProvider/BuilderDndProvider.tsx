import type { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { addComponent } from "../../../features/builder/builderSlice";
import type { ComponentConfig } from "../../../types/builder";

interface BuilderDndProviderProps {
  children: ReactNode;
}

export const BuilderDndProvider: FC<BuilderDndProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log("Drag start:", active);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log("Drag over:", { active, over });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "builder-canvas") {
      const componentData = active.data.current as ComponentConfig;
      dispatch(
        addComponent({
          type: componentData.type,
          icon: componentData.icon,
          label: componentData.label,
        })
      );
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
};
