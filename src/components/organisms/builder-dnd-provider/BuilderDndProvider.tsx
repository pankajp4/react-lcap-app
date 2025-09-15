import type { FC, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { addComponent } from "../../../features/builder/builderSlice";
import type { ComponentConfig } from "../../../types/builder";
import type { RootState } from "../../../features/store";

interface BuilderDndProviderProps {
  children: ReactNode;
}

export const BuilderDndProvider: FC<BuilderDndProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const activeFormId = useSelector(
    (state: RootState) => state.builder.activeFormId
  );

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
      if (!activeFormId) return;

      const componentData = active.data.current as ComponentConfig;
      const rect = over.rect as DOMRect;

      dispatch(
        addComponent({
          formId: activeFormId,
          component: {
            id: `${componentData.type}-${Date.now()}`,
            type: componentData.type,
            icon: componentData.icon,
            label: componentData.label,
            x: rect.x,
            y: rect.y,
            width: 200,
            height: 40,
            props: componentData.props || {},
            style: componentData.style || {},
            validation: componentData.validation || {},
            api: componentData.api || {},
            category: componentData.category,
            properties: componentData.properties || [],
          },
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
