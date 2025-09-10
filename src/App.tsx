import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { TopNavbar } from "./components/organisms/navigation/TopNavbar/index";
import { BuilderLayout } from "./components/organisms/builder/BuilderLayout";
import { NotificationSystem } from "./components/atoms/display/NotificationSystem";
import { ErrorBoundary } from "./components/atoms/display/ErrorBoundary";

const App: React.FC = () => {
  const handleLogout = useCallback(() => {
    // Implement logout logic
    console.log("Logout clicked");
  }, []);

  const handleSettings = useCallback(() => {
    // Implement settings logic
    console.log("Settings clicked");
  }, []);

  return (
    <ErrorBoundary>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <TopNavbar onLogout={handleLogout} onSettings={handleSettings} />
        <BuilderLayout />
        <NotificationSystem />
      </Box>
    </ErrorBoundary>
  );
};

export default App;
