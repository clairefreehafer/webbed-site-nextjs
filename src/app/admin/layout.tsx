"use client";

import { usePathname } from "next/navigation";
import Nav, { NavLink } from "../components/nav";
import { flexColumnCenter } from "@styles/layout";
import { Fragment } from "react";
import styled from "styled-components";
import { MAX_SITE_WIDTH } from "@styles/variables";

const adminLinks: NavLink[] = [
  {
    pathname: "/admin",
    name: "admin home"
  },
  {
    pathname: "/admin/photo",
    name: "photos"
  },
  {
    pathname: "/admin/album",
    name: "albums"
  },
  {
    pathname: "/admin/tags",
    name: "tags"
  },
];

const Main = styled.main`
  ${flexColumnCenter};
  margin: 0 auto;
  max-width: ${MAX_SITE_WIDTH};
  width: 100%;
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
          <h2 css={{ margin: "0 auto 0.5rem" }}>
            {slug}
          </h2>
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/");

  return (
    <>
      <header css={flexColumnCenter}>
        <Nav navLinks={adminLinks} />
        {generateHeader(pathname)}
      </header>
      <Main>
        {children}
      </Main>
    </>
  )
}