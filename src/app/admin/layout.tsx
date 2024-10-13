import Nav from "@components/Nav";
import Title from "@components/Title";
import { ReactNode } from "react";
import { css, cx } from "@panda/css";
import Header from "@components/Header";
import { fullScreen } from "@styles/layout";
import { scanLines } from "@panda/patterns";
import { SiteContainer } from "@panda/jsx";

const themeRoot = cx(
  css({
    ...fullScreen,
    position: "relative",
  }),
  scanLines({
    bg: "black",
    color: "white",
    fontFamily: "ptMono",
    _after: {
      height: "100%",
      minHeight: "100vh",
      width: "100vw",
    },
  })
);

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={themeRoot} data-panda-theme="admin">
      <SiteContainer>
        <Header>
          <Nav />
          <Title />
        </Header>
        <main className={css({ width: "100%" })}>{children}</main>
      </SiteContainer>
    </div>
  );
}
