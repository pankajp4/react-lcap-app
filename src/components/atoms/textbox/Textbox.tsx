import React, { forwardRef, useCallback, useState } from "react";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { NumericFormat } from "react-number-format";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Textbox.module.css";

export type TextboxType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "search"
  | "url";

export interface TextboxProps {
  type?: TextboxType;
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
  helperText?: string;
  infoText?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  decimalScale?: number;
  className?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  maxLength?: number;
  name?: string;
  id?: string;
  showPasswordToggle?: boolean;
}

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      type = "text",
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      error,
      helperText,
      infoText,
      disabled,
      required,
      autoFocus,
      autoComplete,
      min,
      max,
      step,
      decimalScale,
      className,
      fullWidth = true,
      multiline,
      rows,
      maxRows,
      minRows,
      maxLength,
      name,
      id,
      showPasswordToggle = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const renderPasswordAdornment = () => {
      if (type !== "password" || !showPasswordToggle) return null;

      return (
        <InputAdornment position="end">
          <IconButton
            onClick={togglePasswordVisibility}
            onMouseDown={(e) => e.preventDefault()}
            size="small"
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      );
    };

    const renderErrorIcon = () => {
      if (!error || !helperText) return null;

      return (
        <InputAdornment position="end">
          <Tooltip title={helperText} arrow>
            <ErrorIcon color="error" />
          </Tooltip>
        </InputAdornment>
      );
    };

    const renderInfoIcon = () => {
      if (!infoText) return null;

      return (
        <InputAdornment position="end">
          <Tooltip title={infoText} arrow>
            <InfoIcon color="info" />
          </Tooltip>
        </InputAdornment>
      );
    };

    if (type === "number") {
      return (
        <div className={styles.textbox}>
          <NumericFormat
            customInput={TextField}
            value={value}
            defaultValue={defaultValue}
            onValueChange={(values) => {
              onChange?.(values.value);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            helperText={helperText}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            className={className}
            fullWidth={fullWidth}
            inputRef={ref}
            thousandSeparator
            decimalScale={decimalScale}
            allowNegative={min === undefined || min < 0}
            isAllowed={(values) => {
              const { floatValue } = values;
              if (floatValue === undefined) return true;
              if (min !== undefined && floatValue < min) return false;
              if (max !== undefined && floatValue > max) return false;
              return true;
            }}
            {...props}
            InputProps={{
              endAdornment: renderErrorIcon() || renderInfoIcon(),
            }}
          />
        </div>
      );
    }

    return (
      <div className={styles.textbox}>
        <TextField
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          helperText={helperText}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className={className}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          maxRows={maxRows}
          minRows={minRows}
          inputProps={{
            maxLength,
            min,
            max,
            step,
          }}
          name={name}
          id={id}
          inputRef={ref}
          {...props}
          InputProps={{
            endAdornment:
              renderPasswordAdornment() ||
              renderErrorIcon() ||
              renderInfoIcon(),
          }}
        />
      </div>
    );
  }
);
