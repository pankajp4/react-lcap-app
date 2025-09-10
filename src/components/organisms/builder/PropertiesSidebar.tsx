import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../features/store";
import type { BuilderComponent } from "../../../types/builder";
import {
  updateComponent,
  deleteComponent,
} from "../../../features/builder/builderSlice";
import { PropertyField } from "../../atoms/inputs/PropertyField";
import styles from "./PropertiesSidebar.module.css";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

interface PropertyAccordionProps {
  title: string;
  expanded: boolean;
  onExpandChange: () => void;
  children: React.ReactNode;
}

const PropertyAccordion = ({
  title,
  expanded,
  onExpandChange,
  children,
}: PropertyAccordionProps) => {
  return (
    <Accordion expanded={expanded} onChange={onExpandChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export const PropertiesSidebar = () => {
  const dispatch = useDispatch();
  const activeFormId = useSelector(
    (state: RootState) => state.builder.activeFormId
  );
  const selectedComponentId = useSelector(
    (state: RootState) => state.builder.selectedComponentId
  );
  const selectedComponent = useSelector((state: RootState) => {
    const activeForm = state.builder.forms.find(
      (form) => form.id === activeFormId
    );
    return activeForm?.components.find(
      (comp) => comp.id === selectedComponentId
    );
  });

  const [expandedSection, setExpandedSection] = useState<string>("style");

  const handlePropertyChange = useCallback(
    <T extends string | number | boolean>(
      key: string,
      value: T,
      section: "props" | "style" | "validation" | "api" = "props"
    ) => {
      if (activeFormId && selectedComponentId && selectedComponent) {
        dispatch(
          updateComponent({
            formId: activeFormId,
            componentId: selectedComponentId,
            updates: {
              [section]: {
                ...(selectedComponent[section] || {}),
                [key]: value,
              },
            },
          })
        );
      }
    },
    [dispatch, activeFormId, selectedComponentId, selectedComponent]
  );

  const handleDeleteComponent = useCallback(() => {
    if (activeFormId && selectedComponentId) {
      dispatch(
        deleteComponent({
          formId: activeFormId,
          componentId: selectedComponentId,
        })
      );
    }
  }, [dispatch, activeFormId, selectedComponentId]);

  if (!selectedComponent) {
    return (
      <aside className={styles.propertiesSidebar}>
        <div className={styles.noSelection}>
          Select a component to edit its properties
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.propertiesSidebar}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          {selectedComponent.label} Properties
        </Typography>
        <IconButton
          size="small"
          onClick={handleDeleteComponent}
          aria-label="Delete component"
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <PropertyAccordion
        title="Style"
        expanded={expandedSection === "style"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "style" ? "" : "style")
        }
      >
        <PropertyField
          type="text"
          label="Background Color"
          value={selectedComponent.style?.backgroundColor || "#ffffff"}
          onChange={(value: string) =>
            handlePropertyChange("backgroundColor", value, "style")
          }
        />
        <PropertyField
          type="number"
          label="Width"
          value={selectedComponent.style?.width || 0}
          onChange={(value: number) =>
            handlePropertyChange("width", value, "style")
          }
        />
        <PropertyField
          type="number"
          label="Height"
          value={selectedComponent.style?.height || 0}
          onChange={(value: number) =>
            handlePropertyChange("height", value, "style")
          }
        />
      </PropertyAccordion>

      <PropertyAccordion
        title="Properties"
        expanded={expandedSection === "props"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "props" ? "" : "props")
        }
      >
        {Object.entries(selectedComponent.props || {}).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <PropertyField
                key={key}
                type="boolean"
                label={key}
                value={value}
                onChange={(newValue: boolean) =>
                  handlePropertyChange(key, newValue, "props")
                }
              />
            );
          }
          if (typeof value === "number") {
            return (
              <PropertyField
                key={key}
                type="number"
                label={key}
                value={value}
                onChange={(newValue: number) =>
                  handlePropertyChange(key, newValue, "props")
                }
              />
            );
          }
          if (Array.isArray(value)) {
            const options = value.filter(
              (v): v is string | number =>
                typeof v === "string" || typeof v === "number"
            );
            const firstOption = options[0];
            if (firstOption !== undefined) {
              return (
                <PropertyField
                  key={key}
                  type="select"
                  label={key}
                  value={firstOption}
                  options={options}
                  onChange={(newValue: string | number) =>
                    handlePropertyChange(key, newValue, "props")
                  }
                />
              );
            }
          }
          return (
            <PropertyField
              key={key}
              type="text"
              label={key}
              value={String(value)}
              onChange={(newValue: string) =>
                handlePropertyChange(key, newValue, "props")
              }
            />
          );
        })}
      </PropertyAccordion>

      <PropertyAccordion
        title="Validation"
        expanded={expandedSection === "validation"}
        onExpandChange={() =>
          setExpandedSection(
            expandedSection === "validation" ? "" : "validation"
          )
        }
      >
        <PropertyField
          type="boolean"
          label="Required"
          value={selectedComponent.validation?.required || false}
          onChange={(value: boolean) =>
            handlePropertyChange("required", value, "validation")
          }
        />
        <PropertyField
          type="number"
          label="Min Length"
          value={selectedComponent.validation?.minLength || 0}
          onChange={(value: number) =>
            handlePropertyChange("minLength", value, "validation")
          }
        />
        <PropertyField
          type="number"
          label="Max Length"
          value={selectedComponent.validation?.maxLength || 0}
          onChange={(value: number) =>
            handlePropertyChange("maxLength", value, "validation")
          }
        />
        <PropertyField
          type="text"
          label="Pattern"
          value={selectedComponent.validation?.pattern || ""}
          onChange={(value: string) =>
            handlePropertyChange("pattern", value, "validation")
          }
        />
      </PropertyAccordion>

      <PropertyAccordion
        title="API"
        expanded={expandedSection === "api"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "api" ? "" : "api")
        }
      >
        <PropertyField
          type="select"
          label="Method"
          value={selectedComponent.api?.method || HTTP_METHODS[0]}
          options={Array.from(HTTP_METHODS)}
          onChange={(value: string | number) =>
            handlePropertyChange("method", value as HttpMethod, "api")
          }
        />
        <PropertyField
          type="text"
          label="Endpoint"
          value={selectedComponent.api?.endpoint || ""}
          onChange={(value: string) =>
            handlePropertyChange("endpoint", value, "api")
          }
        />
      </PropertyAccordion>
    </aside>
  );
};
