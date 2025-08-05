import "@/sass/global.scss";
import "@/sass/photography/style.scss";

import { Metadata } from "next";

import Nav from "@/components/photography/nav";

export const metadata: Metadata = {
  title: "photography — claire freehafer",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <header>
          <h1>claire freehafer</h1>
          <Nav />
        </header>

        <section className="content">{children}</section>
      </body>
    </html>
  );
}
