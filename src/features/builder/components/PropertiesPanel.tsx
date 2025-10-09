import React from "react";
import styled from "@emotion/styled";
import { componentRegistry } from "../componentRegistry";
import type { BaseComponent, PropertyDefinition } from "../types";

const PropertiesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PanelTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const PropertyGroup = styled.div`
  margin-bottom: 1rem;
`;

const PropertyLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const PropertySelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const PropertyCheckbox = styled.input`
  margin-right: 0.5rem;
`;

interface PropertiesPanelProps {
  selectedComponent: BaseComponent | null;
  onPropertyChange: (property: string, value: any) => void;
}

const PropertyField: React.FC<{
  property: PropertyDefinition;
  value: any;
  onChange: (value: any) => void;
}> = ({ property, value, onChange }) => {
  switch (property.type) {
    case "string":
      return (
        <PropertyInput
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <PropertyInput
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <PropertyCheckbox
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case "select":
      return (
        <PropertySelect
          value={value || property.default}
          onChange={(e) => onChange(e.target.value)}
        >
          {property.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </PropertySelect>
      );
    case "color":
      return (
        <PropertyInput
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return null;
  }
};

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  onPropertyChange,
}) => {
  if (!selectedComponent) {
    return (
      <PropertiesPanelContainer>
        <PanelTitle>Properties</PanelTitle>
        <p>No component selected</p>
      </PropertiesPanelContainer>
    );
  }

  const componentDef = componentRegistry
    .flatMap((group) => group.components)
    .find((c) => c.type === selectedComponent.type);

  if (!componentDef) {
    return (
      <PropertiesPanelContainer>
        <PanelTitle>Properties</PanelTitle>
        <p>Component type not found</p>
      </PropertiesPanelContainer>
    );
  }

  return (
    <PropertiesPanelContainer>
      <PanelTitle>{componentDef.name} Properties</PanelTitle>

      <PropertyGroup>
        <PropertyLabel>Component Type</PropertyLabel>
        <PropertyInput value={selectedComponent.type} disabled />
      </PropertyGroup>

      <PropertyGroup>
        <PropertyLabel>ID</PropertyLabel>
        <PropertyInput
          value={selectedComponent.id}
          onChange={(e) => onPropertyChange("id", e.target.value)}
        />
      </PropertyGroup>

      {componentDef.properties.map((property) => (
        <PropertyGroup key={property.name}>
          <PropertyLabel>{property.label}</PropertyLabel>
          <PropertyField
            property={property}
            value={selectedComponent.props[property.name]}
            onChange={(value) => onPropertyChange(property.name, value)}
          />
        </PropertyGroup>
      ))}
    </PropertiesPanelContainer>
  );
};

export default PropertiesPanel;
