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
import {
  Box,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { componentRegistry } from "../../../../../utils/builder/componentRegistry";
import type {
  BaseComponent,
  PropertyDefinition,
} from "../../../../../store/builder/types";

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
        <TextField
          fullWidth
          size="small"
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <TextField
          fullWidth
          size="small"
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label=""
        />
      );
    case "select":
      return (
        <FormControl fullWidth size="small">
          <Select
            value={value || property.default}
            onChange={(e) => onChange(e.target.value)}
          >
            {property.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "color":
      return (
        <TextField
          fullWidth
          size="small"
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
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No component selected
        </Typography>
      </Box>
    );
  }

  const componentDef = componentRegistry
    .flatMap((group) => group.components)
    .find((c) => c.type === selectedComponent.type);

  if (!componentDef) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Component type not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {componentDef.name} Properties
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="component-type" sx={{ marginBottom: 0.5 }}>
          Component Type
        </InputLabel>
        <TextField
          id="component-type"
          fullWidth
          size="small"
          value={selectedComponent.type}
          disabled
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="component-id" sx={{ marginBottom: 0.5 }}>
          ID
        </InputLabel>
        <TextField
          id="component-id"
          fullWidth
          size="small"
          value={selectedComponent.id}
          onChange={(e) => onPropertyChange("id", e.target.value)}
        />
      </Box>

      {componentDef.properties.map((property) => (
        <Box key={property.name} sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ marginBottom: 0.5 }}>{property.label}</InputLabel>
          <PropertyField
            property={property}
            value={selectedComponent.props[property.name]}
            onChange={(value) => onPropertyChange(property.name, value)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PropertiesPanel;
