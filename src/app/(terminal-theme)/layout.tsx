import "@/sass/global.scss";
import "@/sass/terminal/style.scss";

import Nav from "@/components/terminal/nav";
import { atkinsonHyperlegibleMono, pressStart2p } from "@/fonts/terminal";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body
        className={`${pressStart2p.variable} ${atkinsonHyperlegibleMono.variable}`}
      >
        <div className="container">
          <header>
            <h1>claire freehafer</h1>
            <Nav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
