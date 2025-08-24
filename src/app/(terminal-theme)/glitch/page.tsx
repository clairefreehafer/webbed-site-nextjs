import { Metadata } from "next";

import ImageGrid from "@/components/image-grid";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "glitch art",
};

export default async function Page() {
  const images = await getAlbumImages("glitch");
  return (
    <>
      <h2>glitch art</h2>
      <main>
        <ImageGrid images={images} maxCols={1} />
      </main>
    </>
  );
}
