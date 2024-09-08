import Nav from "@components/Nav";
import RainbowBorder from "@components/RainbowBorder";
import SiteContainer from "@components/layout/SiteContainer";
import { css } from "@panda/css";
import { fillParent, fullScreen } from "@utils/layout";

export default function Home() {
  return (
    <div className={fullScreen}>
      <RainbowBorder borderWidth={2}>
        <div
          className={css(fillParent, {
            backgroundColor: "black",
            color: "white",
          })}
        >
          <SiteContainer>
            <h1>claire freehafer</h1>
            <Nav />
            <main
              className={css({
                alignItems: "center",
                display: "flex",
                flexDir: "column",
                justifyContent: "center",
              })}
            >
              <p>
                please click around the site, but be warned it is an active work
                in progress. :)
              </p>
              <p>
                <a href="https://github.com/clairefreehafer/webbed-site-nextjs">
                  view on github
                </a>
              </p>
              <p>find me elsewhere:</p>
              <ul>
                <li>
                  💻 <a href="https://github.com/clairefreehafer">github</a>
                </li>
                <li>
                  👔{" "}
                  <a href="https://linkedin.com/in/clairefreehafer">linkedin</a>
                </li>
                <li>
                  📚 <a href="https://bookwyrm.social.user/loam">bookwyrm</a>
                </li>
              </ul>
            </main>
          </SiteContainer>
        </div>
      </RainbowBorder>
    </div>
  );
}
