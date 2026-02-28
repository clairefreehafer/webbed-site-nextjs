import "@/sass/photography/random-image.scss";

import fg from "fast-glob";
import { Metadata } from "next";

import Breadcrumbs from "@/components/photography/breadcrumbs";

import RandomImage from "./random-image";

export const metadata: Metadata = {
  title: "a random photo",
};

export default async function Page() {
  const allImages = fg
    .sync("public/out/photography/**/*")
    .map((filePath) => filePath.slice(6));

  return (
    <div id="random-image">
      <Breadcrumbs />
      <RandomImage allImages={allImages} />
    </div>
  );
}
