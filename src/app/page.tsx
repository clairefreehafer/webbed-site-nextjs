"use client";

import Nav from "@components/nav";
import DefaultThemeRoot from "@styles/default/root";
import { flexColumnCenter } from "@styles/layout";
import styled, { css } from "styled-components";

const Main = styled.main`
  ${flexColumnCenter};
`;

const spacer = css`
  margin-top: 2rem;
`;

export default function Home() {
  return (
    <DefaultThemeRoot>
      <Nav />
      <Main>
        <h1>claire freehafer</h1>
        <p css={spacer}>
          please click around the site, but be warned it is an active work in progress. :)
        </p>
        <p>
          <a href="https://github.com/clairefreehafer/webbed-site-nextjs">view on github</a>
        </p>
        <p css={spacer}>find me elsewhere:</p>
        <ul>
          <li>
            💻 <a href="https://github.com/clairefreehafer">github</a>
          </li>
          <li>
            👔 <a href="https://linkedin.com/in/clairefreehafer">linkedin</a>
          </li>
          <li>
            📚 <a href="https://bookwyrm.social.user/loam">bookwyrm</a>
          </li>
        </ul>
      </Main>
    </DefaultThemeRoot>
  );
}
