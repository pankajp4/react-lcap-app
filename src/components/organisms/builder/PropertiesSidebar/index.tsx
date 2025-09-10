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

import type { RootState } from "../../../../features/store";
import {
  updateComponent,
  deleteComponent,
} from "../../../../features/builder/builderSlice";
import { PropertyField } from "../../../atoms/inputs/PropertyField";
import styles from "./styles.module.css";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

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
    <Accordion
      expanded={expanded}
      onChange={onExpandChange}
      className={styles.section}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={styles.sectionHeader}
      >
        <Typography className={styles.sectionTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.sectionContent}>
        {children}
      </AccordionDetails>
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
      <div className={styles.propertiesSidebar}>
        <div className={styles.noSelection}>
          Select a component to edit its properties
        </div>
      </div>
    );
  }

  return (
    <div className={styles.propertiesSidebar}>
      <div className={styles.header}>
        <Typography className={styles.title}>Properties</Typography>
      </div>

      <div className={styles.actionRow}>
        <IconButton size="small" onClick={handleDeleteComponent}>
          <DeleteIcon className={styles.actionIcon} />
        </IconButton>
        <Typography variant="subtitle2">Delete Component</Typography>
      </div>

      <PropertyAccordion
        title="Style Properties"
        expanded={expandedSection === "style"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "style" ? "" : "style")
        }
      >
        <div className={styles.propertyGroup}>
          {/* Style properties */}
          <PropertyField
            label="Width"
            type="text"
            value={selectedComponent.style?.width || ""}
            onChange={(value) => handlePropertyChange("width", value, "style")}
          />
          <PropertyField
            label="Height"
            type="text"
            value={selectedComponent.style?.height || ""}
            onChange={(value) => handlePropertyChange("height", value, "style")}
          />
          <PropertyField
            label="Background Color"
            type="color"
            value={selectedComponent.style?.backgroundColor || "#ffffff"}
            onChange={(value) =>
              handlePropertyChange("backgroundColor", value, "style")
            }
          />
        </div>
      </PropertyAccordion>

      <PropertyAccordion
        title="Component Properties"
        expanded={expandedSection === "props"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "props" ? "" : "props")
        }
      >
        <div className={styles.propertyGroup}>
          {/* Basic properties */}
          <PropertyField
            label="Label"
            type="text"
            value={selectedComponent.props?.label || ""}
            onChange={(value) => handlePropertyChange("label", value, "props")}
          />
          <PropertyField
            label="Placeholder"
            type="text"
            value={selectedComponent.props?.placeholder || ""}
            onChange={(value) =>
              handlePropertyChange("placeholder", value, "props")
            }
          />
          <PropertyField
            label="Default Value"
            type="text"
            value={selectedComponent.props?.defaultValue || ""}
            onChange={(value) =>
              handlePropertyChange("defaultValue", value, "props")
            }
          />
          <PropertyField
            label="Required"
            type="boolean"
            value={selectedComponent.props?.required || false}
            onChange={(value) =>
              handlePropertyChange("required", value, "props")
            }
          />
        </div>
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
        <div className={styles.propertyGroup}>
          {/* Validation properties */}
          <PropertyField
            label="Min Length"
            type="number"
            value={selectedComponent.validation?.minLength || 0}
            onChange={(value) =>
              handlePropertyChange("minLength", value, "validation")
            }
          />
          <PropertyField
            label="Max Length"
            type="number"
            value={selectedComponent.validation?.maxLength || 0}
            onChange={(value) =>
              handlePropertyChange("maxLength", value, "validation")
            }
          />
          <PropertyField
            label="Pattern"
            type="text"
            value={selectedComponent.validation?.pattern || ""}
            onChange={(value) =>
              handlePropertyChange("pattern", value, "validation")
            }
          />
        </div>
      </PropertyAccordion>

      <PropertyAccordion
        title="API Integration"
        expanded={expandedSection === "api"}
        onExpandChange={() =>
          setExpandedSection(expandedSection === "api" ? "" : "api")
        }
      >
        <div className={styles.apiSection}>
          <div className={styles.methodSelector}>
            {HTTP_METHODS.map((method) => (
              <button
                key={method}
                className={styles.methodButton}
                data-active={
                  selectedComponent.api?.method === method ? "true" : undefined
                }
                onClick={() => handlePropertyChange("method", method, "api")}
              >
                {method}
              </button>
            ))}
          </div>
          <PropertyField
            label="API Endpoint"
            type="text"
            value={selectedComponent.api?.endpoint || ""}
            onChange={(value) => handlePropertyChange("endpoint", value, "api")}
          />
        </div>
      </PropertyAccordion>
    </div>
  );
};
