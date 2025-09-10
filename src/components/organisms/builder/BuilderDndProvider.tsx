import type { ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { setIsDragging } from "../../../features/builder/builderSlice";

interface BuilderDndProviderProps {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

/**
 * Provides drag and drop context for the builder
 * Handles drag start and end events
 */
export const BuilderDndProvider = ({
  children,
  onDragEnd,
}: BuilderDndProviderProps) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance in pixels before activating
      },
    })
  );

  const handleDragStart = (_event: DragStartEvent) => {
    dispatch(setIsDragging(true));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    dispatch(setIsDragging(false));
    onDragEnd(event);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay />
    </DndContext>
  );
};
