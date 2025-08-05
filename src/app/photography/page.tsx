import { Metadata } from "next";

import Menu from "./menu";

export const metadata: Metadata = { title: "photography — claire freehafer" };

export default async function Page() {
  return (
    <>
      <h2>photography</h2>
      <Menu />
    </>
  );
}
