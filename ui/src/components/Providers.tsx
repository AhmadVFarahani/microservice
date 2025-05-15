// src/components/Providers.tsx
"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets default browser styles */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
