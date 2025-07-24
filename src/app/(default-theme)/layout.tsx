import Link from "next/link";
import localFont from "next/font/local";
import Nav from "@/components/nav";
import "@/sass/default/style.scss";
import Stars from "@/components/stars";

function getBuildDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

// https://www.brailleinstitute.org/freefont/
const atkinsonHyperlegibleNext = localFont({
  variable: "--font-atkinson-hyperlegible-next",
  src: [
    {
      path: "../../../public/fonts/default/atkinson-hyperlegible-next.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

const atkinsonHyperlegibleMono = localFont({
  variable: "--font-atkinson-hyperlegible-mono",
  src: [
    {
      path: "../../../public/fonts/default/atkinson-hyperlegible-mono.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

// https://fonts.google.com/specimen/EB+Garamond
const garamond = localFont({
  variable: "--font-garamond",
  src: [
    {
      path: "../../../public/fonts/default/garamond.woff2",
      style: "normal",
    },
    {
      path: "../../../public/fonts/default/garamond-italic.woff2",
      style: "italic",
    },
  ],
  fallback: ["Georgia", "serif"],
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <Stars />

        <div
          className={`container ${atkinsonHyperlegibleNext.variable} ${atkinsonHyperlegibleMono.variable} ${garamond.variable}`}
        >
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
              <a href="https://github.com/clairefreehafer/webbed-site-nextjs">
                github
              </a>
            </p>
            <p>last updated {getBuildDate()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
