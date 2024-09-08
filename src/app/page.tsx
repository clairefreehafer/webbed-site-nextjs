import Nav from "@components/Nav";
import RainbowBorder from "@components/RainbowBorder";
import FillParent from "@components/layout/FillParent";
import FullScreen from "@components/layout/FullScreen";

export default function Home() {
  return (
    <FullScreen>
      <RainbowBorder borderWidth={2}>
        <FillParent style={{ backgroundColor: "black", color: "white" }}>
          <Nav />
          <main className="flex flex-col items-center justify-center">
            <h1>claire freehafer</h1>
            <p className="mt-0">
              please click around the site, but be warned it is an active work
              in progress. :)
            </p>
            <p>
              <a href="https://github.com/clairefreehafer/webbed-site-nextjs">
                view on github
              </a>
            </p>
            <p className="mt-0">find me elsewhere:</p>
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
        </FillParent>
      </RainbowBorder>
    </FullScreen>
  );
}
