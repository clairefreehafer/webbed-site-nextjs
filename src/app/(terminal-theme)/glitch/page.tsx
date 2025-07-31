import ImageGrid from "@/components/image-grid";
import { getAlbumImages } from "@/utils/digikam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "glitch art — claire freehafer",
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
