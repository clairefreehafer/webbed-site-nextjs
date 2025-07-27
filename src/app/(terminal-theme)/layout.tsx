import "@/sass/global.scss";
import "@/sass/terminal/style.scss";
import localFont from "next/font/local";
import { Press_Start_2P } from "next/font/google";

/** 8-bit */
const pressStart2P = Press_Start_2P({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

// https://www.brailleinstitute.org/freefont/
const atkinsonHyperlegibleMono = localFont({
  variable: "--font-atkinson-hyperlegible-mono",
  src: [
    {
      path: "../../../public/fonts/default/atkinson-hyperlegible-mono.woff2",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body
        className={`${pressStart2P.variable} ${atkinsonHyperlegibleMono.variable}`}
      >
        <div className="container">
          <header>
            <h1>claire freehafer</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
