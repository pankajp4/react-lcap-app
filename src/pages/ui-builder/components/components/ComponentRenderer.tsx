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
} from "@mui/material";
import React from "react";

import {
  Textbox,
  // Add other components as they become available
} from "../../../../components/atoms";
import type { BaseComponent } from "../../../../store/builder/types";

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
          style={{ width: "100%" }}
        >
          {component.children?.map((child) => (
            <div
              key={child.id}
              style={{
                flex: 1,
                width: "100%",
                maxWidth: `${100 / (component.props.columns || 1)}%`,
                padding: "8px",
              }}
            >
              <ComponentRenderer component={child} />
            </div>
          ))}
        </Grid>
      );

    case "form":
      return (
        <form
          {...component.props}
          style={{ padding: component.props.padding }}
          onSubmit={(e) => e.preventDefault()}
        >
          {renderChildren(component.children)}
        </form>
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
          style={{ padding: component.props.padding }}
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
                  sx={
                    component.props.striped
                      ? {
                          "&:nth-of-type(odd)": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }
                      : undefined
                  }
                  hover={component.props.hoverable}
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
      return <div>Unknown component type: {component.type}</div>;
  }
};

export default ComponentRenderer;
