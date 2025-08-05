import "@/sass/global.scss";
import "@/sass/default/style.scss";

import { Caveat, Redacted_Script } from "next/font/google";
import localFont from "next/font/local";

import Stars from "@/components/stars";

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

const caveat = Caveat({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

const redactedScript = Redacted_Script({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-redacted-script",
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html
      className={`${atkinsonHyperlegibleNext.variable} ${atkinsonHyperlegibleMono.variable} ${garamond.variable} ${caveat.variable} ${redactedScript.variable}`}
    >
      <body>
        <Stars />

        {children}
      </body>
    </html>
  );
}
