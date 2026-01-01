import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
