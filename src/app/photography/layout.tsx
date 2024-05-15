"use client";

import Nav from "@components/nav";
import { loveYaLikeASister } from "@fonts";
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

  & > p {
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

// TODO: refactor
function generateHeader(pathname: string[]) {
  return pathname.map((slug, idx) => {
    if (idx === 0) {
      return <h1 key={slug} css={{ margin: "0.5rem auto" }}>claire freehafer</h1>
    }
    if (idx === 1) {
      return (
        <Fragment key={slug}>
          <p>▽</p>
          <h2 css={{ margin: "0 auto 0.5rem" }}>{slug}</h2>
        </Fragment>
      );
    }
    if (idx === 2) {
      return (
        <Fragment key={slug}>
          <p css={{ fontSize: "0.75rem" }}>▽</p>
          <h3 css={{ margin: "0.2rem auto" }}>{slug}</h3>
        </Fragment>
      )
    }
  });
}

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
            {generateHeader(pathname)}
          </Title>
        </header>
        <Main>
          {children}
        </Main>
      </DefaultThemeRoot>
    </ThemeProvider>
  )
}