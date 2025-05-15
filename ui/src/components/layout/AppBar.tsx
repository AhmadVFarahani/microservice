// src/components/layout/AppBar.tsx
"use client";

import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type AppBarProps = {
  onMenuClick?: () => void; // Optional callback for Sidebar toggle
};

export default function AppBar({ onMenuClick }: AppBarProps) {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Sidebar
      }}
    >
      <Toolbar>
        {/* Sidebar toggle button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* App title */}
        <Typography variant="h6" noWrap component="div">
          Membership Admin Panel
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
