"use client";

import { animalCrossingTheme } from "@styles/animal-crossing/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export default function Layout(
  { children }: { children: ReactNode }
) {
  return (
    <ThemeProvider theme={animalCrossingTheme}>
      {children}
    </ThemeProvider>
  )
}