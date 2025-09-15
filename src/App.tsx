import { Box } from "@mui/material";
import React, { useCallback } from "react";

import { ErrorBoundary, NotificationSystem } from "./components/atoms";
import { BuilderLayout, TopNavbar } from "./components/organisms/";

const App: React.FC = () => {
  const handleLogout = useCallback(() => {
    // Implement logout logic
    console.log("Logout clicked");
  }, []);

  const handleSettings = useCallback(() => {
    // Implement settings logic
    console.log("Settings clicked");
  }, []);

  const handlePreview = useCallback(() => {
    // Implement preview logic
    console.log("Preview clicked");
  }, []);

  return (
    <ErrorBoundary>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <TopNavbar
          onLogout={handleLogout}
          onSettings={handleSettings}
          onPreview={handlePreview}
          userName="John Doe" // Replace with actual user name from auth
          userAvatar="https://via.placeholder.com/40" // Replace with actual user avatar
        />
        <BuilderLayout />
        <NotificationSystem />
      </Box>
    </ErrorBoundary>
  );
};

export default App;
