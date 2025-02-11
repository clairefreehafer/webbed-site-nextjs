import Link from "next/link";
import localFont from "next/font/local";
import Nav from "@/components/nav";
import "@/sass/default/style.scss";

function getBuildDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

const atkinsonHyperlegible = localFont({
  variable: "--font-atkinson-hyperlegible",
  src: [
    {
      path: "../../../public/fonts/default/atkinson-hyperlegible.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/default/atkinson-hyperlegible-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className={`container ${atkinsonHyperlegible.variable}`}>
        <header className="header">
          <h1>claire freehafer</h1>
          <nav>
            <Nav />
          </nav>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <p>
            <Link href="/sitemap">site map</Link>
          </p>
          <p>
            made with{" "}
            <a href="https://nextjs.org" target="_blank">
              next.js
            </a>{" "}
            | hosted on{" "}
            <a href="https://neocities.org" target="_blank">
              neocities
            </a>{" "}
            | source code on{" "}
            <a href="https://github.com/clairefreehafer/webbed-site-11ty">
              github
            </a>
          </p>
          <p>last updated {getBuildDate()}</p>
        </footer>
      </div>
    </>
  );
}
