import { Metadata } from "next";
import Image from "next/image";

import ImageBorder from "@/components/notebook/image-border";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "uncharted 4",
};

export default async function Page() {
  const images = await getAlbumImages("uncharted-4", "video-games", {
    resize: 582,
  });

  return (
    <>
      <h2>uncharted 4</h2>
      <p>
        photos from my first playthrough, taken with the in-game camera feature.
        some are purely edited using the in-game tools, others have had further
        post-processing done outside of the game.
      </p>
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
    </>
  );
}
