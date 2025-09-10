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
  | "password"
  | "email"
  | "tel"
  | "currency"
  | "number"
  | "decimal"
  | "url"
  | "search";

export interface TextboxProps {
  // Basic props
  id?: string;
  name?: string;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  helperText?: string;
  type?: TextboxType;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;

  // Validation props
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;

  // Currency props
  currency?: string;
  locale?: string;
  decimals?: number;

  // Style props
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  className?: string;
  inputClassName?: string;

  // Action props
  onChange?: (value: string | number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;

  // API props
  apiEndpoint?: string;
  apiMethod?: "GET" | "POST" | "PUT" | "PATCH";
  apiHeaders?: Record<string, string>;
  onApiSuccess?: (response: any) => void;
  onApiError?: (error: any) => void;

  // Additional props
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  tooltip?: string;
  infoTooltip?: string;
}

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (props, ref) => {
    const {
      type = "text",
      value,
      onChange,
      currency = "USD",
      locale = "en-US",
      decimals = 2,
      variant = "outlined",
      size = "small",
      tooltip,
      infoTooltip,
      className,
      inputClassName,
      startAdornment,
      endAdornment,
      ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement> | string | number) => {
        if (!onChange) return;

        if (typeof e === "string" || typeof e === "number") {
          onChange(e);
        } else {
          onChange(e.target.value);
        }
      },
      [onChange]
    );

    const getInputProps = () => {
      const baseProps = {
        ...rest,
        ref,
        className: inputClassName,
      };

      switch (type) {
        case "tel":
          return {
            ...baseProps,
            type: "tel",
            pattern: "[0-9]*",
            onChange:
              handleChange as React.ChangeEventHandler<HTMLInputElement>,
          };
        case "password":
          return {
            ...baseProps,
            type: showPassword ? "text" : "password",
            onChange:
              handleChange as React.ChangeEventHandler<HTMLInputElement>,
          };
        default:
          return {
            ...baseProps,
            type,
            onChange:
              handleChange as React.ChangeEventHandler<HTMLInputElement>,
          };
      }
    };

    const renderAdornments = () => {
      const adornments: React.ReactNode[] = [];

      if (startAdornment) {
        adornments.push(
          <InputAdornment key="start" position="start">
            {startAdornment}
          </InputAdornment>
        );
      }

      if (type === "password") {
        adornments.push(
          <InputAdornment key="password" position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        );
      }

      if (props.error) {
        adornments.push(
          <InputAdornment key="error" position="end">
            <Tooltip title={props.helperText || ""}>
              <ErrorIcon color="error" />
            </Tooltip>
          </InputAdornment>
        );
      }

      if (infoTooltip) {
        adornments.push(
          <InputAdornment key="info" position="end">
            <Tooltip title={infoTooltip}>
              <InfoIcon color="info" />
            </Tooltip>
          </InputAdornment>
        );
      }

      if (endAdornment) {
        adornments.push(
          <InputAdornment key="end" position="end">
            {endAdornment}
          </InputAdornment>
        );
      }

      return adornments;
    };

    const adornments = renderAdornments();
    const inputProps = {
      startAdornment: adornments.find((a) => (a as any).key === "start"),
      endAdornment: <>{adornments.filter((a) => (a as any).key !== "start")}</>,
    };

    const commonProps = {
      className: `${styles.textbox} ${className || ""}`,
      variant,
      size,
      InputProps: inputProps,
    };

    if (type === "currency" || type === "decimal" || type === "number") {
      return (
        <Tooltip title={tooltip || ""} arrow>
          <NumericFormat
            value={value}
            onValueChange={(values) => {
              if (onChange) onChange(values.value);
            }}
            thousandSeparator={true}
            decimalScale={decimals}
            fixedDecimalScale={true}
            prefix={type === "currency" ? `${currency} ` : undefined}
            customInput={TextField}
            {...commonProps}
            {...rest}
            inputRef={ref}
          />
        </Tooltip>
      );
    }

    return (
      <Tooltip title={tooltip || ""} arrow>
        <TextField {...getInputProps()} value={value} {...commonProps} />
      </Tooltip>
    );
  }
);
