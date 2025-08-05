import { Metadata } from "next";
import Image from "next/image";

import ImageBorder from "@/components/notebook/image-border";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "uncharted 4 — claire freehafer",
};

export default async function Page() {
  const images = await getAlbumImages("uncharted-4", "video-games", {
    resize: 582,
  });

  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageBorder key={image.filename}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            className="image"
            alt=""
          />
        </ImageBorder>
      ))}
    </div>
  );
}
