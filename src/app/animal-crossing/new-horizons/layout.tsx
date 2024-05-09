"use client";

import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

const StyleRoot = styled.div`
  & .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  }
`;

const H3 = styled.h3`
  font-size: 2rem;
  font-weight: normal;
  // TODO: add a fun underline
`;

export default function NewHorizonsPage(
  { children }: { children: Readonly<ReactNode> }
) {
  return (
    <StyleRoot>
      <H3>
        <Link href="/animal-crossing/new-horizons">
          new horizons
        </Link>
      </H3>
      {children}
    </StyleRoot>
  )
}