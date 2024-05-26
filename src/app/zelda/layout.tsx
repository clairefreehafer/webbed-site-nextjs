"use client";

import Navigation from "@components/nav";
import { hyliaSerif } from "@fonts/zelda";
import { flexColumnCenter } from "@styles/layout";
import { MAX_SITE_WIDTH } from "@styles/variables";
import { ZeldaThemeRoot, pageBorder, whiteToBlue, zeldaTextBackground, zeldaTheme } from "@styles/zelda/theme";
import { ReactNode } from "react"
import styled, { ThemeProvider } from "styled-components";

const TopBorder = styled.img`
  ${whiteToBlue};
  ${pageBorder};
  top: 0;
  transform: rotate(180deg);
`;

const TopBorderGlow = styled(TopBorder)`
  opacity: 0.5;
`;

const Header = styled.header`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  padding: 1rem;
`;

const Title = styled.h1`
  font-family: var(--font-hylia-serif), serif;
  font-size: 3rem;
  font-weight: normal;
  margin: 1rem auto;
  text-transform: capitalize;
`;

const Main = styled.main`
  ${flexColumnCenter};
  ${zeldaTextBackground};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  padding: 1rem;
`;

const BottomBorder = styled.img`
  ${whiteToBlue};
  ${pageBorder};
  bottom: 0;
`;

const BottomBorderGlow = styled(BottomBorder)`
  opacity: 0.5;
`;

type Props = {
  children: ReactNode
};

export default function ZeldaLayout({ children }: Props) {
  return (
    <ThemeProvider theme={zeldaTheme}>
      <ZeldaThemeRoot className={hyliaSerif.variable}>
        <TopBorderGlow src="/images/zelda/pad-frame_glow.png" alt="" />
        <TopBorder src="/images/zelda/pad-frame.png" alt="" />
        <Header>
          <Navigation />
          <Title>claire freehafer</Title>
        </Header>
        <Main>
          {children}
        </Main>
        <BottomBorderGlow src="/images/zelda/pad-frame_glow.png" alt="" />
        <BottomBorder src="/images/zelda/pad-frame.png" alt="" />
      </ZeldaThemeRoot>
    </ThemeProvider>
  )
}