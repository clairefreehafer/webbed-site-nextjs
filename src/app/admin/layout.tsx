import { usePathname } from "next/navigation";
import Nav from "@components/Nav";
import { pressStart2P, ptMono } from "@fonts";
import Title from "@components/Title";
import { ReactNode } from "react";
import { css, cx } from "@panda/css";
import Header from "@components/Header";
import { scanLines } from "@styles/admin";
import { fullScreen } from "@styles/layout";
import SiteContainer from "@components/layout/SiteContainer";

const themeRoot = cx(
  css(fullScreen),
  css(scanLines),
  css({
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
            <Title separator="▼" />
          </div>
        </Header>
        <main className={css({ width: "100%" })}>{children}</main>
      </SiteContainer>
    </div>
  );
}
