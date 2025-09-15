import { Box } from "@mui/material";
import { ComponentSidebar } from "../component-sidebar/ComponentSidebar";
import { BuilderCanvas } from "../builder-canvas/BuilderCanvas";
import { PropertiesSidebar } from "../properties-sidebar/PropertiesSidebar";
import { BuilderDndProvider } from "../builder-dnd-provider/BuilderDndProvider";
import styles from "./BuilderLayout.module.css";

export const BuilderLayout = () => {
  return (
    <BuilderDndProvider>
      <Box className={styles.layout}>
        <ComponentSidebar />
        <BuilderCanvas />
        <PropertiesSidebar />
      </Box>
    </BuilderDndProvider>
  );
};
