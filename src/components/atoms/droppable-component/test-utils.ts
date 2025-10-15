import { vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import type { ComponentType, ComponentCategory } from "../../../types/builder";

// Create mock store with initial state
export const createMockStore = (initialState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      builder: (
        state = { selectedComponentId: null, ...initialState.builder }
      ) => state,
    },
  });
};

// Common test utilities
export const createTestProps = (overrides = {}) => ({
  component: {
    id: "test-1",
    type: "textbox" as ComponentType,
    label: "Test Input",
    category: "input" as ComponentCategory,
    icon: "TextFields",
    x: 100,
    y: 100,
    width: 200,
    height: 40,
    props: {
      label: "Test Input",
      placeholder: "Enter text",
    },
    ...overrides,
  },
  onSelect: vi.fn(),
  onDeselect: vi.fn(),
});

// Mock CSS modules
export const mockStyles = {
  droppable: "droppable-test",
  draggingOver: "draggingOver-test",
  selected: "selected-test",
  handle: "handle-test",
  resizeHandles: "resizeHandles-test",
  topLeft: "topLeft-test",
  topRight: "topRight-test",
  bottomLeft: "bottomLeft-test",
  bottomRight: "bottomRight-test",
} as const;
