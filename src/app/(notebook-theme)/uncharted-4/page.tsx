import ImageBorder from "@/components/notebook/image-border";
import ImageGrid from "@/components/photography/image-grid";
import { getAlbumImages } from "@/utils/digikam";
import Image from "next/image";

export default async function Page() {
  const images = await getAlbumImages("uncharted 4");
  const image = images[0];

  return (
    <ImageBorder>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        className="image"
        alt=""
      />
    </ImageBorder>
  );

  return <ImageGrid images={images} />;
}
