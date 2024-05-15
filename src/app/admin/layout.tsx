"use client";

import { usePathname } from "next/navigation";
import Nav from "@components/nav";
import { flexColumnCenter } from "@styles/layout";
import { Fragment } from "react";
import styled from "styled-components";
import { MAX_SITE_WIDTH } from "@styles/variables";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";

const Main = styled.main`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  width: 100%;
`;

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Title = styled.div`
  ${flexColumnCenter};
  // https://codepen.io/albpara/pen/JjRarO
  // (another option: https://codepen.io/robdimarzo/pen/eYWmxKr)
  box-shadow:
    6px 0 white,
    -6px 0 white,
    0 -6px white,
    0 6px white;
  padding: 1rem;
  margin: 1rem;
`;

// TODO: refactor and add links
function generateHeader(pathname: string[]) {
  return pathname.map((slug, idx) => {
    if (idx === 0) {
      return <h1 key={slug} css={{ margin: "0.5rem auto" }}>claire freehafer</h1>
    }
    if (idx === 1) {
      return (
        <Fragment key={slug}>
          <p>▽</p>
          <h2 css={{ margin: "0 auto 0.5rem" }}>
            <Link href={`/${slug}`}>{slug}</Link>
          </h2>
        </Fragment>
      );
    }
    if (idx === 2) {
      return (
        <Fragment key={slug}>
          <p css={{ fontSize: "0.75rem" }}>▽</p>
          <h3 css={{ margin: "0.2rem auto" }}>
            <Link href={`/admin/${slug}`}>{slug}</Link>
          </h3>
        </Fragment>
      )
    }
  });
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/");

  return (
    <>
      <header css={flexColumnCenter}>
        <Nav />
        <Title className={pressStart.className}>
          {generateHeader(pathname)}
        </Title>
      </header>
      <Main>
        {children}
      </Main>
    </>
  )
}