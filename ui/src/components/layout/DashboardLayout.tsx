// src/components/layout/DashboardLayout.tsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "./AppBar";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true); // Sidebar state

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // space under AppBar
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
