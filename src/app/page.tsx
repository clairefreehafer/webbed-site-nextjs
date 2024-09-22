import HomeNav from "@components/Nav/HomeNav";
import RainbowBorder from "@components/home/RainbowBorder";
import HomeHeading from "@components/home/Heading";
import { css } from "@panda/css";
import { fillParent, fullScreen } from "@styles/layout";
import { SiteContainer } from "@panda/jsx";
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
    <div className={css(fullScreen)}>
      <RainbowBorder borderWidth={2} className={rainbowBorder}>
        <div
          className={css(fillParent, {
            backgroundColor: "black",
            color: "white",
          })}
        >
          <SiteContainer>
            <HomeHeading element="h1">claire freehafer</HomeHeading>
            <main
              className={css({
                alignItems: "center",
                display: "flex",
                flexDir: "column",
                gap: "2rem",
                justifyContent: "center",
                width: "100%",
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
              <HomeHeading element="h2">find me elsewhere</HomeHeading>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  width: "100%",
                })}
              >
                <div>
                  <h3 className={h3}>coding</h3>
                  <ul>
                    <li>
                      💻{" "}
                      <StyledLink
                        href="https://github.com/clairefreehafer"
                        target="_blank"
                      >
                        github
                      </StyledLink>
                    </li>
                  </ul>
                  <li>
                    👔{" "}
                    <StyledLink href="https://linkedin.com/in/clairefreehafer">
                      linkedin
                    </StyledLink>
                  </li>
                </div>
                <div>
                  <h3 className={h3}>photography</h3>
                </div>
                {/* <ul>
                  <li>
                    📚 <a href="https://bookwyrm.social.user/loam">bookwyrm</a>
                  </li>
                </ul> */}
              </div>
            </main>
          </SiteContainer>
        </div>
      </RainbowBorder>
    </div>
  );
}
