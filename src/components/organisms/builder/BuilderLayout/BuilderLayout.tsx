import { Box } from "@mui/material";
import { ComponentSidebar } from "../ComponentSidebar/ComponentSidebar";
import { BuilderCanvas } from "../BuilderCanvas/BuilderCanvas";
import { PropertiesSidebar } from "../PropertiesSidebar/PropertiesSidebar";
import { BuilderDndProvider } from "../BuilderDndProvider/BuilderDndProvider";
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
