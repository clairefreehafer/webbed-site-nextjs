import ImageBorder from "@/components/notebook/image-border";
import { getAlbumImages } from "@/utils/digikam";
import Image from "next/image";

export default async function Page() {
  const images = await getAlbumImages("uncharted 4", { resize: 582 });

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
