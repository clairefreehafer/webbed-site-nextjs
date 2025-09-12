import Image from "next/image";

import ImageBorder from "@/components/notebook/image-border";
import { getAlbumImages } from "@/utils/digikam";

export default async function Page() {
  const images = await getAlbumImages("grand-theft-auto-v", "video-games", {
    resize: 600,
  });

  return (
    <>
      <h2>grand theft auto V</h2>

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
