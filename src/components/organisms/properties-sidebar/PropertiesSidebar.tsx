import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Typography } from "@mui/material";
import type { RootState } from "../../../features/store";
import { updateComponent } from "../../../features/builder/builderSlice";
import type { PropertyConfig } from "../../../types/builder";
import { PropertyField } from "../../atoms";
import styles from "./PropertiesSidebar.module.css";

export const PropertiesSidebar = () => {
  const dispatch = useDispatch();

  const { selectedComponent, componentConfig, activeFormId } = useSelector(
    (state: RootState) => {
      const selectedId = state.builder.selectedComponentId;
      const activeFormId = state.builder.activeFormId;
      const activeForm = state.builder.forms.find((f) => f.id === activeFormId);
      const component = activeForm?.components.find((c) => c.id === selectedId);
      const config = component
        ? state.builder.availableComponents.find(
            (c) => c.type === component.type
          )
        : null;

      return {
        selectedComponent: component,
        componentConfig: config,
        activeFormId: state.builder.activeFormId,
      };
    }
  );

  const handlePropertyChange = useCallback(
    (property: string) => (value: any) => {
      if (!selectedComponent) return;

      if (!activeFormId) return;
      dispatch(
        updateComponent({
          formId: activeFormId,
          componentId: selectedComponent.id,
          updates: {
            [property]: value,
          },
        })
      );
    },
    [dispatch, selectedComponent]
  );

  if (!selectedComponent || !componentConfig) {
    return (
      <Paper elevation={1} className={styles.sidebar}>
        <Box className={styles.empty}>
          <Typography variant="body1" color="textSecondary">
            Select a component to edit its properties
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} className={styles.sidebar}>
      <Box className={styles.header}>
        <Typography variant="h6">{componentConfig.label}</Typography>
        <Typography variant="caption" color="textSecondary">
          Properties
        </Typography>
      </Box>
      <Box className={styles.content}>
        {componentConfig.properties?.map((property: PropertyConfig) => (
          <PropertyField
            key={property.name}
            property={property}
            value={selectedComponent[property.name]}
            onChange={handlePropertyChange(property.name)}
          />
        ))}
      </Box>
    </Paper>
  );
};
