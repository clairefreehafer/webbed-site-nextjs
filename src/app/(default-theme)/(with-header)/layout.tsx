import Link from "next/link";

import Nav from "@/components/default/nav";

function getBuildDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="container">
      <header className="header">
        <h1>claire freehafer</h1>
        <nav>
          <Nav />
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>
          <Link href="/sitemap">sitemap</Link> |{" "}
          <Link href="/changelog">changelog</Link>
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
  );
}
