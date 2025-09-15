import { Box } from "@mui/material";

import { BuilderCanvas } from "../builder-canvas/BuilderCanvas";
import { BuilderDndProvider } from "../builder-dnd-provider/BuilderDndProvider";
import { ComponentSidebar } from "../component-sidebar/ComponentSidebar";
import { PropertiesSidebar } from "../properties-sidebar/PropertiesSidebar";
import styles from "./BuilderLayout.module.css";

export const BuilderLayout = () => {
  return (
    <BuilderDndProvider>
      <Box className={styles.layout}>
        <Box className={styles.sidebar}>
          <ComponentSidebar />
        </Box>
        <Box className={styles.canvas}>
          <BuilderCanvas />
        </Box>
        <Box className={styles.sidebar}>
          <PropertiesSidebar />
        </Box>
      </Box>
    </BuilderDndProvider>
  );
};
