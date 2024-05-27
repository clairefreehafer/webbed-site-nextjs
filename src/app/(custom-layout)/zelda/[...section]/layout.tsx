"use client";

import { zeldaTheme } from "@styles/zelda/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export default function Layout(
  { children }: { children: ReactNode }
) {
  return (
    <ThemeProvider theme={zeldaTheme}>
      {children}
    </ThemeProvider>
  )
}