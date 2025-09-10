import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ComponentConfig } from "../../../../types/builder";
import { DraggableComponent } from "../../../atoms/display/DraggableComponent";
import styles from "./styles.module.css";

interface ComponentGroupProps {
  title: string;
  components: ComponentConfig[];
}

/**
 * A group of related components in an accordion
 * Used to organize components by category in the sidebar
 */
export const ComponentGroup = ({ title, components }: ComponentGroupProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      className={styles.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={styles.accordionSummary}
      >
        <Typography variant="subtitle2" fontWeight="medium">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        {components.map((component) => (
          <DraggableComponent key={component.type} component={component} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
