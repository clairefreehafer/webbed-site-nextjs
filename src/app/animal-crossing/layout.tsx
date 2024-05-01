"use client";

import Navigation from "@app/components/nav";
import AnimalCrossingLogo from "@components/animal-crossing/logo";
import { flexColumnCenter, fullScreen } from "@styles/layout";
import { MAX_SITE_WIDTH } from "@styles/variables";
import { DateRange, GrassShape, getDateRange, grassColors } from "@utils/animal-crossing";
import styled, { ThemeProvider } from "styled-components";
import localFont from "next/font/local";

const AnimalCrossingThemeRoot = styled.div<{ $shape: GrassShape, $dateRange: DateRange; }>`
  ${fullScreen};
  background-color: ${({ $dateRange }) => grassColors[$dateRange]};
  background-image: url(${({ $shape, $dateRange }) => `/images/animal-crossing/grass/${$shape}_${$dateRange}.png`});
`;

const Header = styled.header`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  padding: 1rem;
`;

const theme = {
  name: "animal-crossing"
};

const fotSeuratProB = localFont({
  src: [
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff2" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.otf" }
  ]
});

export default function AnimalCrossingLayout({ children }: { children: Readonly<React.ReactNode> }) {
  const dateRange = getDateRange();

  return (
    <ThemeProvider theme={theme}>
      <AnimalCrossingThemeRoot
        $shape={"square"}
        $dateRange={dateRange}
        className={fotSeuratProB.className}
      >
        <Header>
          <AnimalCrossingLogo text="claire freehafer" />
          <Navigation />
        </Header>
        {children}
      </AnimalCrossingThemeRoot>
    </ThemeProvider>
  )
}