import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { PropertyField } from "@atoms/property-field/PropertyField";
import type { PropertyConfig } from "@/types/builder";

describe("PropertyField", () => {
  // Common test props
  const onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  describe("Text Input", () => {
    const textProperty: PropertyConfig = {
      name: "label",
      type: "string",
      label: "Label Text",
    };

    it("renders text input correctly", () => {
      render(
        <PropertyField
          property={textProperty}
          value="Test Label"
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Label Text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("Test Label");
    });

    it("handles text input changes", () => {
      render(
        <PropertyField
          property={textProperty}
          value="Initial"
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Label Text");
      fireEvent.change(input, { target: { value: "Updated Label" } });
      expect(onChangeMock).toHaveBeenCalledWith("Updated Label");
    });

    it("handles null value gracefully", () => {
      render(
        <PropertyField
          property={textProperty}
          value={null}
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Label Text");
      expect(input).toHaveValue("");
    });
  });

  describe("Number Input", () => {
    const numberProperty: PropertyConfig = {
      name: "width",
      type: "number",
      label: "Width",
    };

    it("renders number input correctly", () => {
      render(
        <PropertyField
          property={numberProperty}
          value={100}
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Width");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(100);
    });

    it("handles number input changes", () => {
      render(
        <PropertyField
          property={numberProperty}
          value={100}
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Width");
      fireEvent.change(input, { target: { value: "200" } });
      expect(onChangeMock).toHaveBeenCalledWith(200);
    });

    it("handles empty value correctly", () => {
      render(
        <PropertyField
          property={numberProperty}
          value={null}
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Width");
      expect(input).toHaveValue(null);
    });
  });

  describe("Boolean Switch", () => {
    const booleanProperty: PropertyConfig = {
      name: "visible",
      type: "boolean",
      label: "Visible",
    };

    it("renders switch correctly", () => {
      render(
        <PropertyField
          property={booleanProperty}
          value={true}
          onChange={onChangeMock}
        />
      );

      const switchControl = screen.getByRole("switch");
      expect(switchControl).toBeInTheDocument();
      expect(switchControl).toBeChecked();
    });

    it("handles switch changes", () => {
      render(
        <PropertyField
          property={booleanProperty}
          value={false}
          onChange={onChangeMock}
        />
      );

      const switchControl = screen.getByRole("switch");
      fireEvent.click(switchControl);
      expect(onChangeMock).toHaveBeenCalledWith(true);
    });
  });

  describe("Select Input", () => {
    const selectProperty: PropertyConfig = {
      name: "alignment",
      type: "string",
      label: "Alignment",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
    };

    it("renders select correctly", () => {
      render(
        <PropertyField
          property={selectProperty}
          value="left"
          onChange={onChangeMock}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      expect(screen.getByText("Left")).toBeInTheDocument();
    });

    it("handles select changes", () => {
      render(
        <PropertyField
          property={selectProperty}
          value="left"
          onChange={onChangeMock}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.mouseDown(select);
      const option = screen.getByText("Center");
      fireEvent.click(option);
      expect(onChangeMock).toHaveBeenCalledWith("center");
    });

    it("displays all options correctly", () => {
      render(
        <PropertyField
          property={selectProperty}
          value="left"
          onChange={onChangeMock}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.mouseDown(select);

      // Get all options by role
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Left");
      expect(options[1]).toHaveTextContent("Center");
      expect(options[2]).toHaveTextContent("Right");
    });
  });

  describe("Color Input", () => {
    const colorProperty: PropertyConfig = {
      name: "color",
      type: "string",
      label: "Text Color",
    };

    it("renders color input correctly", () => {
      render(
        <PropertyField
          property={colorProperty}
          value="#ff0000"
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Text Color");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "color");
      expect(input).toHaveValue("#ff0000");
    });

    it("handles color changes", () => {
      render(
        <PropertyField
          property={colorProperty}
          value="#ff0000"
          onChange={onChangeMock}
        />
      );

      const input = screen.getByLabelText("Text Color");
      fireEvent.change(input, { target: { value: "#00ff00" } });
      expect(onChangeMock).toHaveBeenCalledWith("#00ff00");
    });
  });

  describe("Edge Cases", () => {
    it("returns null for unsupported property types", () => {
      const unsupportedProperty: PropertyConfig = {
        name: "test",
        type: "unknown" as any,
        label: "Test",
      };

      const { container } = render(
        <PropertyField
          property={unsupportedProperty}
          value={null}
          onChange={onChangeMock}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it("handles string object values in select options", () => {
      const complexSelectProperty: PropertyConfig = {
        name: "config",
        type: "string",
        label: "Config",
        options: [
          { value: "config1", label: "Config 1" },
          { value: "config2", label: "Config 2" },
        ],
      };

      render(
        <PropertyField
          property={complexSelectProperty}
          value="config1"
          onChange={onChangeMock}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      expect(select).toHaveTextContent("Config 1");

      // Verify options
      fireEvent.mouseDown(select);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveTextContent("Config 1");
      expect(options[1]).toHaveTextContent("Config 2");
    });
  });
});
