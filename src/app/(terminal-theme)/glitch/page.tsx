import { Metadata } from "next";

import ImageGridWithGrouping from "@/components/image-grid-with-grouping";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "glitch art",
};

export default async function Page() {
  const images = await getAlbumImages("glitch", "digital-art");
  return (
    <>
      <h2>glitch art</h2>
      <ImageGridWithGrouping images={images} maxCols={1} />
    </>
  );
}
