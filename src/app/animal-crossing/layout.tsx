"use client";

import Navigation from "@components/nav";
import AnimalCrossingLogo from "@components/animal-crossing/logo";
import { flexColumnCenter } from "@styles/layout";
import { MAX_SITE_WIDTH } from "@styles/variables";
import styled, { ThemeProvider } from "styled-components";
import localFont from "next/font/local";
import { AnimalCrossingThemeRoot, animalCrossingTheme } from "@styles/animal-crossing/theme";

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
  text-shadow: rgba(255, 255, 255, 0.9) 0 0 5px;
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