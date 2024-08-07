"use client";

import Nav from "@components/Nav";
import Title from "@components/Title";
import { cutiveMono, loveYaLikeASister } from "@fonts";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import "@styles/notebook/theme.css";

export default function PhotographyLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname().split("/");

  return (
    <div className="min-w-screen min-h-screen bg-black p-4 text-white">
      <header className="flex flex-col items-center">
        <Nav className={cutiveMono.className} theme="notebook" />
        {/* https://codepen.io/mp/pen/kBEeKw
        (another option: https://codepen.io/tmrDevelops/pen/NPXodB) */}
        <div
          className={`${loveYaLikeASister.className} my-4 flex flex-col items-center rounded-[95%_4%_92%_5%/4%_95%_6%_95%] border-white p-4 text-3xl`}
          style={{ borderWidth: "3px 4px 3px 5px" }}
        >
          <Title pathname={pathname} />
        </div>
      </header>
      <main className="paper-bg max-w-site-width mx-auto my-8 rounded-3xl opacity-85">
        {children}
      </main>
    </div>
  );
}
