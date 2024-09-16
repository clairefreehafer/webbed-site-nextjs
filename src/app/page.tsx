import Nav from "@components/Nav";
import HomeNav from "@components/Nav/HomeNav";
import RainbowBorder from "@components/RainbowBorder";
import SiteContainer from "@components/layout/SiteContainer";
import Analglyph from "@components/text/Analglyph";
import { css } from "@panda/css";
import { fillParent, fullScreen } from "@styles/layout";

const rainbowBorder = css({
  width: "100%",
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
            <Analglyph>claire freehafer</Analglyph>
            <main
              className={css({
                alignItems: "center",
                display: "flex",
                flexDir: "column",
                gap: "1rem",
                justifyContent: "center",
              })}
            >
              <p>
                please click around the site, but be warned it is an active work
                in progress. :)
              </p>
              <HomeNav />
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
