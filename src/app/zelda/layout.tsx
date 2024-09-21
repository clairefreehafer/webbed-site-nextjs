import Navigation from "@components/Nav";
import { hyliaSerif } from "@fonts/zelda";
import { ReactNode } from "react";
import PageBorder from "@components/zelda/PageBorder";
import ThemeRoot from "@components/zelda/ThemeRoot";
import { SiteContainer } from "@panda/jsx";
import Header from "@components/Header";
import { css, cx } from "@panda/css";
import { zeldaTextBackground } from "@styles/zelda";

const title = cx(
  hyliaSerif.className,
  css({
    color: "lightBlue",
    fontSize: "3rem",
    textTransform: "capitalize",
  })
);

const main = css({
  ...zeldaTextBackground,
});

type Props = {
  children: ReactNode;
};

export default function ZeldaLayout({ children }: Props) {
  return (
    <ThemeRoot>
      <PageBorder position="top" />
      <SiteContainer>
        <Header>
          <Navigation theme="zelda" />
          <h1 className={title}>claire freehafer</h1>
        </Header>
        <main className={main}>{children}</main>
      </SiteContainer>
      <PageBorder position="bottom" />
    </ThemeRoot>
  );
}
