"use client";

import Navigation from "@app/components/nav";
import AnimalCrossingLogo, { SVG_HEIGHT } from "@components/animal-crossing/logo";
import { flexColumnCenter, fullScreen } from "@styles/layout";
import { MAX_SITE_WIDTH } from "@styles/variables";
import { GrassDateRange, GRASS_COLORS } from "@utils/animal-crossing";
import styled, { ThemeProvider } from "styled-components";
import localFont from "next/font/local";
import { animalCrossingTheme } from "@styles/animal-crossing/theme";

const AnimalCrossingThemeRoot = styled.div`
  ${fullScreen};
  background-color: ${({ theme }) => GRASS_COLORS[theme.grassDateRange as GrassDateRange]};
  background-image: url(${({ theme }) => `/images/animal-crossing/grass/${theme.shape}_${theme.grassDateRange}.png`});
  background-position: left calc(50% - 128px) top calc(6rem + ${SVG_HEIGHT});
`;

const Header = styled.header`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  padding: 1rem;
`;

const Main = styled.main`
  ${flexColumnCenter};
  background-color: #cfbe95;
  background-image: url(${({ theme }) => `/images/animal-crossing/sand/${theme.shape}_${theme.grassDateRange}.png`});
  background-position: center top;
  background-repeat: repeat-x;
  border-radius: 20px;
  box-shadow: 0 1rem 0.5rem -0.5rem rgba(0, 0, 0, 0.5);
  color: black;
  margin: 0 auto 1rem;
  max-width: 50rem;
  padding: 8.5rem 3rem 1rem;
  text-shadow: white 0 0 5px;
`;

const fotSeuratProB = localFont({
  src: [
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff2" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.woff" },
    { path: "../../fonts/animal-crossing/fot-seurat-pro-b.otf" }
  ]
});

export default function AnimalCrossingLayout(
  { children }:
  { children: Readonly<React.ReactNode> }
) {
  return (
    <ThemeProvider theme={animalCrossingTheme}>
      <AnimalCrossingThemeRoot className={fotSeuratProB.className}>
        <Header>
          <AnimalCrossingLogo text="claire freehafer" />
          <Navigation />
        </Header>
        <Main>
          {children}
        </Main>
      </AnimalCrossingThemeRoot>
    </ThemeProvider>
  )
}