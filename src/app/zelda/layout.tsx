import Nav from "@/components/nav";
import "@/sass/zelda/style.scss";
import "@/sass/global.scss";
import localFont from "next/font/local";
import Name from "@/components/zelda/name";

export function generateMetadata() {
  return { title: "zelda — claire freehafer" };
}

const hyliaSerif = localFont({
  variable: "--hylia-serif",
  src: [
    {
      path: "../../../public/fonts/zelda/hylia-serif-regular.woff2",
    },
  ],
  fallback: ["Georgia", "serif"],
});

const hylian = localFont({
  variable: "--hylian-regular",
  src: [
    {
      path: "../../../public/fonts/zelda/hylian-regular.woff2",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const sheikah = localFont({
  variable: "--sheikah",
  src: [
    {
      path: "../../../public/fonts/zelda/sheikah.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/zelda/sheikah-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const fotRodin = localFont({
  variable: "--fot-rodin-pro-db",
  src: [
    {
      path: "../../../public/fonts/zelda/fot-rodin-pro-db.woff2",
    },
  ],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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
          <nav>
            <Nav />
          </nav>
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
