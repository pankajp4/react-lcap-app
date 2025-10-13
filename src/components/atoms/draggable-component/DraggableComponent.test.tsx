import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { DraggableComponent } from "./DraggableComponent";
import { DndContext } from "@dnd-kit/core";
import type { ComponentConfig } from "../../../types/builder";

// Consolidate imports and reduce file handle usage
vi.mock("@mui/icons-material", () => ({
  TextFields: vi.fn(() => <div data-testid="TextFieldsIcon" />),
  DragIndicator: vi.fn(() => null),
}));

// Mock styles to avoid CSS module issues in tests
vi.mock("./DraggableComponent.module.css", () => ({
  default: {
    draggable: "draggable",
    disabled: "disabled",
    dragHandle: "dragHandle",
    content: "content",
  },
}));

describe("DraggableComponent", () => {
  const defaultProps = {
    component: {
      type: "textbox",
      name: "Text Input",
      label: "Text Input",
      icon: "TextFields",
      category: "input",
      props: {
        label: "Text Input",
        placeholder: "Enter text",
      },
    } as ComponentConfig,
    onDragStart: vi.fn(),
    onDragEnd: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onDragStart.mockClear();
    defaultProps.onDragEnd.mockClear();
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <DndContext>{children}</DndContext>
  );

  it("renders with icon and name", () => {
    render(
      <TestWrapper>
        <DraggableComponent component={defaultProps.component} />
      </TestWrapper>
    );

    expect(screen.getByText("Text Input")).toBeInTheDocument();
    expect(screen.getByTestId("TextFieldsIcon")).toBeInTheDocument();
  });

  it("creates a draggable element", () => {
    render(
      <TestWrapper>
        <DraggableComponent component={defaultProps.component} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    expect(draggableElement).toHaveAttribute(
      "data-draggable-id",
      `sidebar-${defaultProps.component.type}`
    );
  });

  it("applies correct styles", () => {
    render(
      <TestWrapper>
        <DraggableComponent component={defaultProps.component} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    expect(draggableElement).toHaveClass("draggable");
  });

  it("has correct accessibility attributes", () => {
    render(
      <TestWrapper>
        <DraggableComponent component={defaultProps.component} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    expect(draggableElement).toHaveAttribute(
      "aria-label",
      "Drag Text Input component"
    );
  });

  it("calls onDragStart callback when drag starts", () => {
    render(
      <TestWrapper>
        <DraggableComponent {...defaultProps} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    fireEvent.dragStart(draggableElement);
    expect(defaultProps.onDragStart).toHaveBeenCalledTimes(1);
  });

  it("calls onDragEnd callback when drag ends", () => {
    render(
      <TestWrapper>
        <DraggableComponent {...defaultProps} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    fireEvent.dragStart(draggableElement);
    fireEvent.dragEnd(draggableElement);
    expect(defaultProps.onDragEnd).toHaveBeenCalledTimes(1);
  });

  it("handles missing callbacks gracefully", () => {
    const { onDragStart, onDragEnd, ...propsWithoutCallbacks } = defaultProps;

    render(
      <TestWrapper>
        <DraggableComponent {...propsWithoutCallbacks} />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    expect(() => {
      fireEvent.dragStart(draggableElement);
      fireEvent.dragEnd(draggableElement);
    }).not.toThrow();
  });

  it("applies disabled styles when disabled prop is true", () => {
    render(
      <TestWrapper>
        <DraggableComponent {...defaultProps} disabled />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    expect(draggableElement).toHaveClass("disabled");
  });

  it("prevents drag operations when disabled", () => {
    render(
      <TestWrapper>
        <DraggableComponent {...defaultProps} disabled />
      </TestWrapper>
    );

    const draggableElement = screen.getByRole("button");
    fireEvent.dragStart(draggableElement);
    expect(defaultProps.onDragStart).not.toHaveBeenCalled();
  });
});
