import Navigation from "@components/nav";
import { hyliaSerif } from "@fonts/zelda";
import { ReactNode } from "react";
import "@styles/zelda/theme.css";
import PageBorder from "@components/zelda/page-border";

type Props = {
  children: ReactNode;
};

export default function ZeldaLayout({ children }: Props) {
  return (
    <div className="bg-zelda h-screen w-screen p-4 text-white">
      <PageBorder />
      <header className="max-w-site-width mx-auto flex flex-col items-center justify-center">
        <Navigation theme="zelda" />
        <h1
          className={`${hyliaSerif.className} text-light-blue my-8 text-5xl capitalize`}
        >
          claire freehafer
        </h1>
      </header>
      <main className="zelda-text-bg max-w-site-width mx-auto">{children}</main>
      <PageBorder rotate />
    </div>
  );
}
