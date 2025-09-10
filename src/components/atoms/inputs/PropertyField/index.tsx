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
import { HexColorPicker } from "react-colorful";
import styles from "./styles.module.css";

type BasePropertyField<T, V> = {
  label: string;
  type: T;
  value: V;
  onChange: (value: V) => void;
  fullWidth?: boolean;
};

type TextPropertyField = BasePropertyField<"text", string>;
type NumberPropertyField = BasePropertyField<"number", number>;
type SelectPropertyField = BasePropertyField<"select", string | number> & {
  options: Array<string | number>;
};
type BooleanPropertyField = BasePropertyField<"boolean", boolean>;
type ColorPropertyField = BasePropertyField<"color", string>;

type PropertyFieldProps =
  | TextPropertyField
  | NumberPropertyField
  | SelectPropertyField
  | BooleanPropertyField
  | ColorPropertyField;

export const PropertyField: FC<PropertyFieldProps> = (props) => {
  const { label, type, value, onChange, fullWidth = true } = props;

  switch (type) {
    case "text":
      return (
        <TextField
          className={styles.field}
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fullWidth={fullWidth}
          size="small"
          variant="outlined"
        />
      );

    case "number":
      return (
        <TextField
          className={styles.field}
          label={label}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          type="number"
          fullWidth={fullWidth}
          size="small"
          variant="outlined"
        />
      );

    case "select":
      return (
        <FormControl
          className={styles.field}
          fullWidth={fullWidth}
          size="small"
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
          >
            {props.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case "boolean":
      return (
        <FormControlLabel
          className={styles.field}
          control={
            <Switch
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              size="small"
            />
          }
          label={label}
        />
      );

    case "color":
      return (
        <div className={styles.colorField}>
          <label>{label}</label>
          <div className={styles.colorPickerContainer}>
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: value as string }}
            />
            <div className={styles.colorPickerPopover}>
              <HexColorPicker
                color={value as string}
                onChange={(color) => onChange(color)}
                className={styles.colorPicker}
              />
            </div>
          </div>
        </div>
      );
  }
};
