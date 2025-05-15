// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light", // We will add dark mode toggle later
    primary: {
      main: "#1976d2", // BCAA blue
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

export default theme;
