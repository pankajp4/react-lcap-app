import type { FC } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import type { ComponentProperty } from "../../../../types/builder";
import styles from "./PropertyField.module.css";

interface PropertyFieldProps {
  property: ComponentProperty;
  value: any;
  onChange: (value: any) => void;
}

export const PropertyField: FC<PropertyFieldProps> = (props) => {
  const { property, value, onChange } = props;

  switch (property.type) {
    case "string":
      return (
        <TextField
          className={styles.field}
          label={property.label}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
          size="small"
          margin="dense"
        />
      );

    case "number":
      return (
        <TextField
          className={styles.field}
          label={property.label}
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          fullWidth
          size="small"
          margin="dense"
        />
      );

    case "boolean":
      return (
        <FormControlLabel
          className={styles.field}
          control={
            <Switch
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              size="small"
            />
          }
          label={property.label}
        />
      );

    case "select":
      return (
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel>{property.label}</InputLabel>
          <Select
            className={styles.field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            label={property.label}
          >
            {property.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case "color":
      return (
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel>{property.label}</InputLabel>
          <TextField
            className={styles.field}
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
          />
        </FormControl>
      );

    default:
      return null;
  }
};
