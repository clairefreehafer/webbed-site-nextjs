import Nav from "@/components/nav";
import "@/sass/zelda/style.scss";
import "@/sass/global.scss";
import localFont from "next/font/local";

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

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body className={hyliaSerif.variable}>
        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-top glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-top" />

        <div className="container">
          <header>
            <h1>claire freehafer</h1>
            <nav>
              <Nav />
            </nav>
          </header>

          <main className="content">{children}</main>
        </div>

        <img
          src="/images/zelda/pad-frame-glow.png"
          className="border-bottom glow"
        />
        <img src="/images/zelda/pad-frame.png" className="border-bottom" />
      </body>
    </html>
  );
}
