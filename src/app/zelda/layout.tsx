import "@/sass/zelda/style.scss";
import "@/sass/global.scss";

import { Metadata } from "next";

import { fotRodin, hylian, hyliaSerif, sheikah } from "@/fonts/zelda";

export const metadata: Metadata = {
  title: {
    default: "zelda — claire freehafer",
    template: "%s — claire freehafer",
  },
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body
        className={`${hyliaSerif.variable} ${fotRodin.variable} ${hylian.variable} ${sheikah.variable}`}
        data-theme="zelda"
      >
        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-top glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-top" />

        {children}

        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-bottom glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-bottom" />
      </body>
    </html>
  );
}
