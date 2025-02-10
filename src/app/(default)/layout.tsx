import "@/sass/default/style.scss";
import Link from "next/link";

function getBuildDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

function getActiveNavLink(currentUrl, pageUrl) {
  // do root separate because "/" matches all URLs
  if (pageUrl === "/" && currentUrl === "/") {
    return "active";
  }
  if (currentUrl.includes(pageUrl) && pageUrl !== "/") {
    return "active";
  }
  return "";
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className="container">
        <header className="header">
          <h1>claire freehafer</h1>
          <nav>nav</nav>
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
            <a href="https://vercel.com" target="_blank">
              vercel
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
