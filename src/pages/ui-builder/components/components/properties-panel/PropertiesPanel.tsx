/**
 * @fileoverview
 * PropertiesPanel component for the UI Builder.
 * Provides an interface for editing component properties dynamically.
 *
 * @module Pages/UIBuilder/Components/PropertiesPanel
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { componentRegistry } from "../../../../../utils/builder/componentRegistry";
import type {
  BaseComponent,
  PropertyDefinition,
} from "../../../../../store/builder/types";
import styles from "./PropertiesPanel.module.css";

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
        <input
          className={styles.input}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          className={styles.input}
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case "select":
      return (
        <select
          className={styles.select}
          value={value || property.default}
          onChange={(e) => onChange(e.target.value)}
        >
          {property.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "color":
      return (
        <input
          className={styles.input}
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
      <div className={styles.container}>
        <h2 className={styles.title}>Properties</h2>
        <p className={styles.emptyMessage}>No component selected</p>
      </div>
    );
  }

  const componentDef = componentRegistry
    .flatMap((group) => group.components)
    .find((c) => c.type === selectedComponent.type);

  if (!componentDef) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Properties</h2>
        <p className={styles.emptyMessage}>Component type not found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{componentDef.name} Properties</h2>

      <div className={styles.propertyGroup}>
        <label className={styles.label} htmlFor="component-type">
          Component Type
        </label>
        <input
          id="component-type"
          className={styles.input}
          value={selectedComponent.type}
          disabled
        />
      </div>

      <div className={styles.propertyGroup}>
        <label className={styles.label} htmlFor="component-id">
          ID
        </label>
        <input
          id="component-id"
          className={styles.input}
          value={selectedComponent.id}
          onChange={(e) => onPropertyChange("id", e.target.value)}
        />
      </div>

      {componentDef.properties.map((property) => (
        <div key={property.name} className={styles.propertyGroup}>
          <label className={styles.label}>{property.label}</label>
          <PropertyField
            property={property}
            value={selectedComponent.props[property.name]}
            onChange={(value) => onPropertyChange(property.name, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
