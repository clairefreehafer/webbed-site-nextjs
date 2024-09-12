import Navigation from "@components/Nav";
import { hyliaSerif } from "@fonts/zelda";
import { ReactNode } from "react";
import PageBorder from "@components/zelda/PageBorder";
import ZeldaThemeRoot from "@styles/zelda/theme";
import SiteContainer from "@components/layout/SiteContainer";
import Header from "@components/Header";
import { css, cx } from "@panda/css";
import { zeldaTextBackground } from "@themes/zelda";

const title = cx(
  hyliaSerif.className,
  css({
    color: "lightBlue",
    fontSize: "3rem",
    textTransform: "capitalize",
  }),
);

const main = css({
  ...zeldaTextBackground,
});

type Props = {
  children: ReactNode;
};

export default function ZeldaLayout({ children }: Props) {
  return (
    <ZeldaThemeRoot>
      <PageBorder position="top" />
      <SiteContainer>
        <Header>
          <Navigation theme="zelda" />
          <h1 className={title}>claire freehafer</h1>
        </Header>
        <main className={main}>{children}</main>
      </SiteContainer>
      <PageBorder position="bottom" />
    </ZeldaThemeRoot>
  );
}
