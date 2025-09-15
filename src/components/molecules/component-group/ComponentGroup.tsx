import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ComponentConfig } from "../../../types/builder";
import { DraggableComponent } from "../../atoms";
import styles from "./ComponentGroup.module.css";

interface ComponentGroupProps {
  title: string;
  components: ComponentConfig[];
}

export const ComponentGroup = ({ title, components }: ComponentGroupProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpand}
      className={styles.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={styles.summary}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" color="textSecondary">
          {components.length} components
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        {components.map((component) => (
          <DraggableComponent key={component.type} component={component} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
