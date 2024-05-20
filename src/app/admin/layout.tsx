"use client";

import { usePathname } from "next/navigation";
import Nav from "@components/nav";
import { flexColumnCenter } from "@styles/layout";
import styled, { ThemeProvider } from "styled-components";
import { MAX_SITE_WIDTH } from "@styles/variables";
import { pressStart2P, ptMono } from "@fonts";
import generateTitle from "@components/title";
import { AdminThemeRoot, adminTheme } from "@styles/admin/theme";

const Main = styled.main`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  width: 100%;
`;

const Title = styled.div`
  ${flexColumnCenter};
  // https://codepen.io/albpara/pen/JjRarO
  // (another option: https://codepen.io/robdimarzo/pen/eYWmxKr)
  box-shadow:
    6px 0 white,
    -6px 0 white,
    0 -6px white,
    0 6px white;
  font-family: var(--font-press-start-2p), sans-serif;
  padding: 1rem;
  margin: 1rem;

  & h1, h2, h3, h4 {
    margin: 0 auto 0.5rem;
  }

  /* TODO: do this programmatically */
  & .separator-1 {
    font-size: 0.75rem;
    margin: 0.25rem auto;
  }

  & .separator-2 {
    font-size: 0.5rem;
    margin: 0.25rem auto;
  }

  & .separator-3 {
    font-size: 0.3rem;
    margin: 0.25rem auto;
  }
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/");

  return (
    <ThemeProvider theme={adminTheme}>
      <AdminThemeRoot className={ptMono.className}>
        <header css={flexColumnCenter}>
          <Nav />
          <Title className={pressStart2P.variable}>
            {generateTitle(pathname, "▼")}
          </Title>
        </header>
        <Main>
          {children}
        </Main>
      </AdminThemeRoot>
    </ThemeProvider>
  )
}