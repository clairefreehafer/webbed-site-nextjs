import { ReactNode } from "react";
import { cutiveMono, loveYaLikeASister } from "@fonts";
import Nav from "@components/Nav";
import Title from "@components/Title";
import { fullScreen } from "@utils/layout";
import { css } from "@panda/css";
import SiteContainer from "@components/layout/SiteContainer";

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
        <header
          className={css({
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          <Nav fontClassName={cutiveMono.className} theme="notebook" />
          {/* https://codepen.io/mp/pen/kBEeKw
          (another option: https://codepen.io/tmrDevelops/pen/NPXodB) */}
          <div
            className={`${loveYaLikeASister.className} my-4 flex flex-col items-center rounded-[95%_4%_92%_5%/4%_95%_6%_95%] border-white p-4 text-3xl`}
            style={{ borderWidth: "3px 4px 3px 5px" }}
          >
            <Title />
          </div>
        </header>
        <main className="paper-bg max-w-site-width mx-auto my-8 rounded-3xl opacity-85">
          {children}
        </main>
      </SiteContainer>
    </div>
  );
}
