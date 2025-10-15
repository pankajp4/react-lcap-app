/**
 * @module Atoms
 * @description
 * Enhanced textbox component that supports various input types and features
 * like password visibility toggle, number formatting, and validation const TextboxComponent = (
    {
      // Input configuration
      type = "text",
      value,
      defaultValue,
 * @category Input
 */

import React, { forwardRef, useCallback, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

/**
 * Supported input types for the Textbox component
 * @category Types
 * @since 1.0.0
 *
 * @remarks
 * The TextboxType union type defines all valid input types that the Textbox
 * component can handle. Each type provides specific features and validations:
 * - text: Standard text input
 * - number: Numeric input with formatting
 * - password: Masked input with visibility toggle
 * - email: Email validation and keyboard optimization
 * - tel: Phone number input with formatting
 * - search: Search input with clear button
 * - url: URL validation and keyboard optimization
 */
export type TextboxType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "search"
  | "url";

/**
 * Props for the Textbox component
 * @interface
 * @category Props
 * @since 1.0.0
 *
 * @remarks
 * The Textbox component is built on top of Material-UI's TextField with added
 * functionality for different input types, validation states, and user feedback.
 */
export interface TextboxProps {
  /**
   * Type of the input field.
   * Determines the input behavior and validation rules.
   * @defaultValue "text"
   */
  type?: TextboxType;

  /**
   * Label text displayed above the input.
   * Provides context about the expected input.
   */
  label?: string;

  /**
   * Placeholder text displayed when input is empty.
   * Offers guidance about the expected format or content.
   */
  placeholder?: string;

  /**
   * Current value of the input.
   * Used for controlled component behavior.
   */
  value?: string | number;

  /**
   * Initial value when component mounts.
   * Used for uncontrolled component behavior.
   */
  defaultValue?: string | number;

  /**
   * Callback when input value changes.
   * @param value - The new input value as a string
   */
  onChange?: (value: string) => void;

  /**
   * Callback when input loses focus.
   * Useful for validation or save operations.
   */
  onBlur?: () => void;

  /**
   * Callback when input gains focus.
   * Useful for analytics or UI state changes.
   */
  onFocus?: () => void;

  /**
   * Whether the input has an error.
   * Controls the error state visual feedback.
   * @defaultValue false
   */
  error?: boolean;
  /** Error message shown below the input */
  helperText?: string;
  /** Informational text shown in a tooltip */
  infoText?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input should automatically receive focus */
  autoFocus?: boolean;
  /** HTML autocomplete attribute */
  autoComplete?: string;
  /** Minimum value for number inputs */
  min?: number;
  /** Maximum value for number inputs */
  max?: number;
  /** Step value for number inputs */
  step?: number;
  /** Number of decimal places for number inputs */
  decimalScale?: number;
  /** Additional CSS class name */
  className?: string;
  /** Whether the input should take up full width */
  fullWidth?: boolean;
  /** Whether the input should support multiple lines */
  multiline?: boolean;
  /** Number of rows for multiline input */
  rows?: number;
  /** Maximum number of rows for multiline input */
  maxRows?: number;
  /** Minimum number of rows for multiline input */
  minRows?: number;
  /** Maximum length of input text */
  maxLength?: number;
  /** Input name attribute */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Whether to show password visibility toggle */
  showPasswordToggle?: boolean;
}

/**
 * A flexible text input component built on Material-UI TextField with enhanced features.
 *
 * @component
 * @category Components
 * @subcategory Input
 *
 * @remarks
 * This component provides:
 * - Multiple input types support (text, number, password, etc.)
 * - Password visibility toggle
 * - Number formatting with decimal support
 * - Multiline input support
 * - Error and helper text display
 * - Info tooltip
 * - Comprehensive accessibility support
 *
 * @example
 * ```tsx
 * <Textbox
 *   type="password"
 *   label="Password"
 *   required
 *   showPasswordToggle
 *   helperText="Must be at least 8 characters"
 *   onChange={(value) => console.log('Password changed:', value)}
 * />
 * ```
 */
/**
 * Implementation of the Textbox component using React.forwardRef to support
 * ref forwarding to the underlying input element.
 *
 * @component
 * @param {TextboxProps} props - Component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref
 * @returns {JSX.Element} Rendered Textbox component
 */
export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      // Input configuration
      type = "text",
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,

      // Validation and feedback
      error,
      helperText,
      infoText,

      // State and accessibility
      disabled,
      required,
      autoFocus,
      autoComplete,

      // Number input constraints
      min,
      max,
      step,
      decimalScale,

      // Layout and appearance
      className,
      fullWidth = true,
      multiline,
      rows,
      maxRows,
      minRows,
      maxLength,

      // HTML attributes
      name,
      id,
      showPasswordToggle = true,
      ...props
    },
    ref
  ) => {
    /**
     * State to track password visibility for password type inputs
     * @state
     */
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Memoized change handler that calls the onChange prop with the input value
     * @callback
     */
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    /**
     * Memoized handler to toggle password visibility
     * @callback
     */
    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    /**
     * Render the password visibility toggle button if this is a password input
     * @returns {JSX.Element | null} Password toggle button or null
     */
    const renderPasswordAdornment = () => {
      if (type !== "password" || !showPasswordToggle) return null;

      return (
        <InputAdornment position="end">
          <IconButton
            onClick={togglePasswordVisibility}
            onMouseDown={(e) => e.preventDefault()}
            size="small"
            edge="end"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      );
    };

    /**
     * Render the error icon with tooltip if there's an error and helper text
     * @returns {JSX.Element | null} Error icon with tooltip or null
     */
    const renderErrorIcon = () => {
      if (!error || !helperText) return null;

      return (
        <InputAdornment position="end">
          <Tooltip title={helperText} arrow>
            <ErrorIcon color="error" aria-label="Error" />
          </Tooltip>
        </InputAdornment>
      );
    };

    /**
     * Render the info icon with tooltip if there's info text
     * @returns {JSX.Element | null} Info icon with tooltip or null
     */
    const renderInfoIcon = () => {
      if (!infoText) return null;

      return (
        <InputAdornment position="end">
          <Tooltip title={infoText} arrow>
            <InfoIcon color="info" aria-label="Information" />
          </Tooltip>
        </InputAdornment>
      );
    };

    /**
     * Special handling for number type inputs using NumericFormat
     * Provides formatted number input with decimal support
     */
    if (type === "number") {
      return (
        <Box sx={{ width: fullWidth ? "100%" : "auto", margin: "4px 0" }}>
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
            slotProps={{
              input: {
                endAdornment: renderErrorIcon() || renderInfoIcon(),
              },
            }}
          />
        </Box>
      );
    }

    /**
     * Default render for all other input types
     * Uses Material-UI TextField with appropriate props and icons
     */
    return (
      <Box sx={{ width: fullWidth ? "100%" : "auto", margin: "4px 0" }}>
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
          name={name}
          id={id}
          inputRef={ref}
          {...props}
          slotProps={{
            htmlInput: {
              maxLength,
              min,
              max,
              step,
            },
            input: {
              endAdornment:
                renderPasswordAdornment() ||
                renderErrorIcon() ||
                renderInfoIcon(),
            },
          }}
        />
      </Box>
    );
  }
);
