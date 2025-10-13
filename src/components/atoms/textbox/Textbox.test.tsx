import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { Textbox } from "./Textbox";

// Mock the NumericFormat component
vi.mock("react-number-format", () => ({
  NumericFormat: ({ onValueChange, value, ...props }: any) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onValueChange({ value: e.target.value })}
      {...props}
    />
  ),
}));

describe("Textbox", () => {
  it("renders with label and placeholder", () => {
    render(<Textbox label="Test Label" placeholder="Test Placeholder" />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("handles text input changes", async () => {
    const handleChange = vi.fn();
    render(<Textbox type="text" label="Text Input" onChange={handleChange} />);

    const input = screen.getByLabelText("Text Input");
    await userEvent.type(input, "test");
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("toggles password visibility", async () => {
    render(<Textbox type="password" label="Password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByLabelText("Show password");
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("handles number input with formatting", async () => {
    const handleChange = vi.fn();
    render(
      <Textbox type="number" label="Number Input" onChange={handleChange} />
    );

    const input = screen.getByRole("textbox");
    // Use fireEvent since we're dealing with a controlled input
    fireEvent.change(input, { target: { value: "1234.56" } });
    expect(handleChange).toHaveBeenCalledWith("1234.56");
  });

  it("shows error state and message", () => {
    render(
      <Textbox label="Error Input" error={true} helperText="Error message" />
    );

    const input = screen.getByRole("textbox");
    expect(input.parentElement).toHaveClass("Mui-error");
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("handles blur and focus events", () => {
    const handleBlur = vi.fn();
    const handleFocus = vi.fn();
    render(
      <Textbox label="Event Input" onBlur={handleBlur} onFocus={handleFocus} />
    );

    const input = screen.getByLabelText("Event Input");
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("handles disabled state", () => {
    render(<Textbox label="Disabled Input" disabled />);

    expect(screen.getByLabelText("Disabled Input")).toBeDisabled();
  });

  it("shows tooltip on hover", async () => {
    render(
      <Textbox label="Input with Tooltip" infoText="Helpful information" />
    );

    const infoIcon = screen.getByTestId("InfoIcon");
    await userEvent.hover(infoIcon);
    // Use findByRole since tooltip is shown after hover
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful information"
    );
  });
});
