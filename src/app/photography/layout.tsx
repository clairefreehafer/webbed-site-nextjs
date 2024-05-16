"use client";

import Nav from "@components/nav";
import generateTitle from "@components/title";
import { loveYaLikeASister, pangolin } from "@fonts";
import DefaultThemeRoot from "@styles/default/root";
import { flexColumnCenter } from "@styles/layout";
import { PAPER_LINE_HEIGHT, paperBackground } from "@styles/mixins";
import { photographyTheme } from "@styles/photography/theme";
import { MAX_SITE_WIDTH } from "@styles/variables";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

const Main = styled.main`
  ${paperBackground()}
  border-radius: 1rem;
  margin: 2rem auto;
  max-width: ${MAX_SITE_WIDTH};
  opacity: 0.85;

  // TODO: do this with classes
  & h3 {
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-family: var(--font-love-ya-like-a-sister);
    margin-bottom: 2px;
  }

  & p {
    font-family: var(--font-pangolin);
    font-size: 1.1rem;
    line-height: 1.5rem;
    margin-bottom: calc(${PAPER_LINE_HEIGHT} + 1px);
  }
`;

const Title = styled.div`
  ${flexColumnCenter};
  // https://codepen.io/mp/pen/kBEeKw
  // (another option: https://codepen.io/tmrDevelops/pen/NPXodB)
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  border: solid white;
  padding: 1rem;
`;

export default function PhotographyLayout({ children }:
  { children: Readonly<React.ReactNode> }
) {
  const pathname = usePathname().split("/");

  return (
    <ThemeProvider theme={photographyTheme}>
      <DefaultThemeRoot borderWidth="2px">
        <header css={flexColumnCenter}>
          <Nav />
          <Title className={loveYaLikeASister.className}>
            {generateTitle(pathname)}
          </Title>
        </header>
        <Main className={`${loveYaLikeASister.variable} ${pangolin.variable}`}>
          {children}
        </Main>
      </DefaultThemeRoot>
    </ThemeProvider>
  )
}