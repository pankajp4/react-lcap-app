import { vi, describe, it, expect, beforeEach } from "vitest";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import { DroppableComponent } from "@atoms/droppable-component/DroppableComponent";
import {
  createMockStore,
  createTestProps,
} from "@atoms/droppable-component/test-utils";

// Mock styles
vi.mock("@atoms/droppable-component/DroppableComponent.module.css", () => ({
  default: {
    droppableContainer: "droppableContainer",
    selected: "selected",
    handle: "handle",
    draggingOver: "draggingOver",
    resizableContent: "resizableContent",
  },
}));

describe("DroppableComponent", () => {
  const mockStore = createMockStore();
  const defaultProps = createTestProps();

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct position and size", () => {
    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);
    expect(component).toHaveStyle({
      transform: "translate(100px, 100px)",
      width: "200px",
      height: "40px",
    });
  });

  it("handles click selection", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);
    await user.click(component);

    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.component.id
    );
  });

  it("handles keyboard selection", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);
    await user.type(component, "{Enter}");
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.component.id
    );

    await user.type(component, " ");
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.component.id
    );
  });

  it("shows resize handles when selected", () => {
    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} isSelected={true} />
      </TestWrapper>
    );

    const handles = screen.getAllByLabelText(/^Resize from/);
    expect(handles).toHaveLength(4);
    handles.forEach((handle) => {
      expect(handle).toHaveAttribute("role", "button");
      expect(handle.getAttribute("aria-label")).toMatch(/^Resize from/);
    });
  });

  it.skip("handles resize interactions", () => {
    const onResize = vi.fn();

    render(
      <TestWrapper>
        <DroppableComponent
          {...defaultProps}
          isSelected={true}
          onResize={onResize}
        />
      </TestWrapper>
    );

    const handle = screen.getByLabelText(/Resize from bottom-right/i);
    expect(handle).toBeInTheDocument();

    // Initial mouse position
    const startX = 0;
    const startY = 0;
    // Target delta - this plus initial dimensions equals expected final dimensions
    const deltaX = 50;
    const deltaY = 50;

    // Mouse down at origin
    fireEvent.mouseDown(handle, { clientX: startX, clientY: startY });

    // Move mouse
    fireEvent.mouseMove(window, {
      clientX: startX + deltaX,
      clientY: startY + deltaY,
    });

    // Release
    fireEvent.mouseUp(window);

    // Original width (200) + deltaX, original height (40) + deltaY
    expect(onResize).toHaveBeenCalledWith(250, 90);
  });

  it("applies selected class when isSelected prop is true", () => {
    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} isSelected={true} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);
    expect(component).toHaveAttribute("aria-pressed", "true");
  });

  it.skip("shows dragging state on drag over", () => {
    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);

    // Test drag enter state using fireEvent helper
    fireEvent.dragEnter(component);
    fireEvent.dragOver(component);
    expect(component).toHaveAttribute("data-dragging", "true");

    // Test drag leave state
    fireEvent.dragLeave(component);
    expect(component).toHaveAttribute("data-dragging", "false");
  });

  it("handles deselection when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <div data-testid="outside" style={{ marginBottom: "20px" }}>
          Outside area
        </div>
        <DroppableComponent {...defaultProps} isSelected={true} />
      </TestWrapper>
    );

    const outsideArea = screen.getByTestId("outside");
    await user.click(outsideArea);

    expect(defaultProps.onDeselect).toHaveBeenCalled();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <DroppableComponent {...defaultProps} />
      </TestWrapper>
    );

    const component = screen.getByTestId(defaultProps.component.id);
    await user.type(component, "{Enter}");
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.component.id
    );

    await user.type(component, " ");
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      defaultProps.component.id
    );
  });
});
