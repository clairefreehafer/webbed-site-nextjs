"use client";

import { usePathname } from "next/navigation";
import Nav from "@components/nav";
import { pressStart2P, ptMono } from "@fonts";
import Title from "@components/title";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname().split("/");

  return (
    <div className={ptMono.className}>
      <header className="flex flex-col items-center justify-center">
        <Nav theme="admin" />
        <div
          className={`${pressStart2P.className} shadow-8-bit-white m-4 flex flex-col items-center justify-center p-4`}
        >
          <Title pathname={pathname} separator="▼" />
        </div>
      </header>
      <main className="mx-auto flex max-w-[750px] flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
