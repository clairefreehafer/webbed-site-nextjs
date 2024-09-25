import HomeNav from "@components/Nav/HomeNav";
import RainbowBorder from "@components/home/RainbowBorder";
import HomeHeading from "@components/home/Heading";
import { css } from "@panda/css";
import { fillParent, fullScreen } from "@styles/layout";
import StyledLink from "@components/Link";

const rainbowBorder = css({
  width: "100%",
});

const h3 = css({
  fontFamily: "var(--font-ribeye-marrow)",
  fontSize: "2rem",
});

export default function Home() {
  return (
    <div className={css(fullScreen)} data-panda-theme="home">
      <RainbowBorder borderWidth={2} className={rainbowBorder}>
        <div
          className={css(fillParent, {
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDir: "column",
            justifyContent: "center",
            p: "1rem",
          })}
        >
          <HomeHeading element="h1">claire freehafer</HomeHeading>
          <main
            className={css({
              alignItems: "center",
              display: "flex",
              flexDir: "column",
              justifyContent: "center",
              width: "100%",
              marginBottom: "5rem",
            })}
          >
            <p>
              please click around the site, but be warned it is an active work
              in progress. :)
              <br />
              (and not yet optimized for mobile devices!)
            </p>
            <p>
              <StyledLink
                href="https://github.com/clairefreehafer/webbed-site-nextjs"
                target="_blank"
              >
                view on github
              </StyledLink>
            </p>

            <HomeHeading element="h2">navigation</HomeHeading>
            <HomeNav />
          </main>
        </div>
      </RainbowBorder>
    </div>
  );
}
