"use client";

import Nav from "@app/components/nav";
import DefaultThemeRoot from "@styles/default/root";
import { flexColumnCenter } from "@styles/layout";
import { PAPER_LINE_HEIGHT, paperBackground } from "@styles/mixins";
import { MAX_SITE_WIDTH } from "@styles/variables";
import styled from "styled-components";

const Main = styled.main`
  ${paperBackground()}
  border-radius: 1rem;
  margin: 2rem auto;
  max-width: ${MAX_SITE_WIDTH};
  opacity: 0.85;

  & > p {
    margin-bottom: calc(${PAPER_LINE_HEIGHT} + 1px);
  }
`;

export default function PhotographyLayout({ children }:
  { children: Readonly<React.ReactNode> }
) {
  return (
    <DefaultThemeRoot borderWidth="2px">
      <header style={flexColumnCenter}>
        <Nav />
        <h1>claire freehafer</h1>
        <h2>photography</h2>
      </header>
      <Main>
        {children}
      </Main>
    </DefaultThemeRoot>
  )
}