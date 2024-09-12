import { ReactNode } from "react";
import Nav from "@components/Nav";
import Title from "@components/Title";
import { fullScreen } from "@styles/layout";
import { css } from "@panda/css";
import SiteContainer from "@components/layout/SiteContainer";
import { paperBackground } from "@styles/notebook";
import Header from "@components/Header";

// https://codepen.io/mp/pen/kBEeKw
// (another option: https://codepen.io/tmrDevelops/pen/NPXodB)
const titleWrapper = css({
  alignItems: "center",
  borderColor: "white",
  borderRadius: "95% 4% 92% 5% / 4% 95% 6% 95%",
  borderWidth: "3px 4px 3px 5px",
  display: "flex",
  flexDirection: "column",
  fontFamily: "loveYaLikeASister",
  fontSize: "1.75rem",
  my: "1rem",
  p: "1rem",
});

const main = css({
  ...paperBackground,
  borderRadius: "3rem",
  lineHeight: "calc({lineHeights.paper} + 1px)",
  opacity: 0.85,
  width: "100%",
});

export default function PhotographyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      data-panda-theme="notebook"
      className={css(fullScreen, { bg: "black", color: "white" })}
    >
      <SiteContainer>
        <Header>
          <Nav theme="notebook" />

          <div className={titleWrapper}>
            <Title />
          </div>
        </Header>
        <main className={main}>{children}</main>
      </SiteContainer>
    </div>
  );
}
