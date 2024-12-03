import { ReactNode } from "react";
import Nav from "@components/Nav";
import Title from "@components/Title";
import { fullScreen } from "@styles/layout";
import { css } from "@panda/css";
import { paperBackground } from "@styles/notebook";
import Header from "@components/Header";
import { SiteContainer } from "@panda/jsx";

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
      <SiteContainer maxWidth={750}>
        <Header>
          <Nav />
          <Title />
        </Header>
        <main className={main}>{children}</main>
      </SiteContainer>
    </div>
  );
}
