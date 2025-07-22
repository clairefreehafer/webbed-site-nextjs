import fg from "fast-glob";
import RandomImage from "./random-image";

export default async function Page() {
  const allImages = fg
    .sync("public/out/photography/**/*")
    .map((filePath) => filePath.slice(6));
  return <RandomImage allImages={allImages} />;
}
