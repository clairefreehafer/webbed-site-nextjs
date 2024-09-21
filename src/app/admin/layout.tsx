import Nav from "@components/Nav";
import Title from "@components/Title";
import { ReactNode } from "react";
import { css, cx } from "@panda/css";
import Header from "@components/Header";
import { fullScreen } from "@styles/layout";
import { scanLines } from "@panda/patterns";
import { SiteContainer } from "@panda/jsx";

const themeRoot = cx(
  css(fullScreen),
  scanLines({
    bg: "black",
    color: "white",
    fontFamily: "ptMono",
  })
);

const titleContainer = css({
  alignItems: "center",
  boxShadow: "8BitWhite",
  display: "flex",
  flexDir: "column",
  fontFamily: "pressStart2P",
  p: "1rem",
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={themeRoot} data-panda-theme="admin">
      <SiteContainer>
        <Header>
          <Nav theme="admin" />
          <div className={titleContainer}>
            <Title theme="admin" />
          </div>
        </Header>
        <main className={css({ width: "100%" })}>{children}</main>
      </SiteContainer>
    </div>
  );
}
