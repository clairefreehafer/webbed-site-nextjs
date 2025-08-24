import "@/sass/zelda/style.scss";
import "@/sass/global.scss";

import Name from "@/components/zelda/name";
import Nav from "@/components/zelda/nav";
import { fotRodin, hylian, hyliaSerif, sheikah } from "@/fonts/zelda";

export function generateMetadata() {
  return { title: "zelda" };
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body
        className={`${hyliaSerif.variable} ${fotRodin.variable} ${hylian.variable} ${sheikah.variable}`}
      >
        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-top glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-top" />

        <header>
          <Name />
          <Nav />
        </header>

        <main className="content">{children}</main>

        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-bottom glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-bottom" />
      </body>
    </html>
  );
}
