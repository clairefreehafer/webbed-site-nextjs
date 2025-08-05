import fg from "fast-glob";
import { Metadata } from "next";
import Link from "next/link";

import RandomImage from "./random-image";

export const metadata: Metadata = {
  title: "a random photo — claire freehafer",
};

export default async function Page() {
  const allImages = fg
    .sync("public/out/photography/**/*")
    .map((filePath) => filePath.slice(6));
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>a random photo</h2>
      </div>
      <RandomImage allImages={allImages} />
    </>
  );
}
