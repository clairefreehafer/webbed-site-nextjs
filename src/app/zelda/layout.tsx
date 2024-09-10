import Navigation from "@components/Nav";
import { hyliaSerif } from "@fonts/zelda";
import { ReactNode } from "react";
import PageBorder from "@components/zelda/PageBorder";
import ZeldaThemeRoot from "@styles/zelda/theme";
import SiteContainer from "@components/layout/SiteContainer";

type Props = {
  children: ReactNode;
};

export default function ZeldaLayout({ children }: Props) {
  return (
    // TODO: extracxt to ZeldaThemeRoot
    <ZeldaThemeRoot>
      <div>
        <PageBorder position="top" />
        <SiteContainer>
          <header className="max-w-site-width mx-auto flex flex-col items-center justify-center">
            <Navigation theme="zelda" />
            <h1
              className={`${hyliaSerif.className} text-light-blue my-8 text-5xl capitalize`}
            >
              claire freehafer
            </h1>
          </header>
          <main className="zelda-text-bg max-w-site-width mx-auto">
            {children}
          </main>
        </SiteContainer>
      </div>
      <PageBorder position="bottom" />
    </ZeldaThemeRoot>
  );
}
