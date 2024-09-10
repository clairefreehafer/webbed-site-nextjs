import { usePathname } from "next/navigation";
import Nav from "@components/Nav";
import { pressStart2P, ptMono } from "@fonts";
import Title from "@components/Title";
import { ReactNode } from "react";
import "@themes/admin.css";
import { css } from "@panda/css";
import Header from "@components/Header";

// https://css-tricks.com/old-timey-terminal-styling/
const afterStyles =
  "after:absolute after:left-0 after:top-0 after:h-full after:min-h-screen after:w-screen after:bg-scan-lines after:pointer-events-none";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${ptMono.className} ${afterStyles} min-w-screen text-shadow relative min-h-screen bg-black text-white`}
    >
      <Header>
        <Nav theme="admin" />
        <div
          className={`${pressStart2P.className} shadow-8-bit-white m-4 flex flex-col items-center justify-center p-4`}
        >
          <Title separator="▼" />
        </div>
      </Header>
      <main className="max-w-site-width mx-auto flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
