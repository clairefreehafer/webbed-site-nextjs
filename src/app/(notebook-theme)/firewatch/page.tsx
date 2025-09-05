import { Metadata } from "next";
import Image from "next/image";

import ImageBorder from "@/components/notebook/image-border";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "firewatch",
};

export default async function Page() {
  const images = await getAlbumImages("firewatch", "video-games", {
    resize: 600,
  });

  return (
    <>
      <h2>firewatch</h2>
      <p>
        photos from my first playthrough, taken with the diegetic disposable
        camera. i hope in future playthroughs to take better advantage of this
        feature. currently there has been no post-processing done to these, but
        one day i may feel so inspired. :)
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
