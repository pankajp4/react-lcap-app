/**
 * @fileoverview
 * ComponentRenderer for the UI Builder.
 * Dynamically renders components based on their type with Material-UI components.
 *
 * @module Pages/UIBuilder/Components/ComponentRenderer
 * @category UIBuilder
 * @since 1.0.0
 */

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import React from "react";

import type { BaseComponent } from "@store/builder/types";
import {
  Textbox,
  // Add other components as they become available
} from "@atoms";
import styles from "@pages/ui-builder/components/components/component-renderer/ComponentRenderer.module.css";

/**
 * Props for the ComponentRenderer
 * @interface
 * @category Props
 */
interface ComponentRendererProps {
  /** The component to render */
  component: BaseComponent;
}

/**
 * ComponentRenderer component
 * @description
 * Recursively renders UI components based on their type definition.
 * Supports nested components and various Material-UI component types.
 *
 * @component
 * @param {ComponentRendererProps} props - Component props
 * @returns {React.ReactElement | null} The rendered component or null
 *
 * @example
 * ```tsx
 * <ComponentRenderer component={component} />
 * ```
 */
const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const renderChildren = (children?: BaseComponent[]) => {
    if (!children?.length) return null;
    return children.map((child) => (
      <ComponentRenderer key={child.id} component={child} />
    ));
  };

  switch (component.type) {
    case "container":
      return (
        <Container
          {...component.props}
          className={styles.container}
          style={{
            padding: component.props.padding,
            maxWidth: component.props.maxWidth,
            display: component.props.display,
            flexDirection: component.props.flexDirection,
          }}
        >
          {renderChildren(component.children)}
        </Container>
      );

    case "grid":
      return (
        <Grid
          container
          spacing={Number(component.props.gap?.replace("rem", "") || 1)}
          className={styles.gridContainer}
        >
          {component.children?.map((child) => (
            <Box
              key={child.id}
              className={styles.gridChild}
              style={{
                maxWidth: `${100 / (component.props.columns || 1)}%`,
              }}
            >
              <ComponentRenderer component={child} />
            </Box>
          ))}
        </Grid>
      );

    case "form":
      return (
        <Box
          component="form"
          {...component.props}
          className={styles.form}
          style={{
            padding: component.props.padding,
          }}
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          {renderChildren(component.children)}
        </Box>
      );

    case "Textbox":
      return (
        <Textbox
          {...component.props}
          type={component.props.type || "text"}
          placeholder={component.props.placeholder}
          required={component.props.required}
          fullWidth={true}
        />
      );

    case "button":
      return (
        <Button
          {...component.props}
          variant={component.props.variant || "contained"}
          color={component.props.color || "primary"}
        >
          {component.props.text || "Button"}
        </Button>
      );

    case "card":
      return (
        <Card
          {...component.props}
          elevation={component.props.elevation}
          className={styles.card}
          style={{
            padding: component.props.padding,
          }}
        >
          <CardContent>{renderChildren(component.children)}</CardContent>
        </Card>
      );

    case "table":
      return (
        <TableContainer component={Paper}>
          <Table {...component.props}>
            <TableHead>
              <TableRow>
                {component.props.columns?.map((column: string) => (
                  <TableCell key={`header-${column}`}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {component.props.data?.map((row: any[], rowIndex: number) => (
                <TableRow
                  key={`row-${component.id}-${rowIndex}`}
                  className={`${
                    component.props.striped && rowIndex % 2 !== 0
                      ? styles.tableRowStriped
                      : ""
                  } ${
                    component.props.hoverable ? styles.tableRowHoverable : ""
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={`cell-${component.id}-${rowIndex}-${cellIndex}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

    default:
      return (
        <Box className={styles.errorMessage}>
          Unknown component type: {component.type}
        </Box>
      );
  }
};

export default ComponentRenderer;
