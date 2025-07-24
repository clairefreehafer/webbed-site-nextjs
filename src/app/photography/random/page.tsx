import fg from "fast-glob";
import RandomImage from "./random-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "a random photo — claire freehafer",
};

export default async function Page() {
  const allImages = fg
    .sync("public/out/photography/**/*")
    .map((filePath) => filePath.slice(6));
  return <RandomImage allImages={allImages} />;
}
