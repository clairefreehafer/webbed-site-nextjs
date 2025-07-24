import localFont from "next/font/local";
import { Caveat, Redacted_Script } from "next/font/google";

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

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body
        className={`${atkinsonHyperlegibleNext.variable} ${caveat.variable} ${redactedScript.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
