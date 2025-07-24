import { Image } from "@/utils/digikam";
import NextImage from "next/image";

export default function ImageGrid({
  images,
  background,
}: {
  images: Image[];
  background?: React.CSSProperties["background"];
}) {
  if (images.length === 0) {
    return "no images :(";
  }
  return (
    <div className="grid" style={background ? { background } : {}}>
      {images.map((image) => (
        <NextImage
          key={image.filename}
          src={image.src}
          height={image.height}
          width={image.width}
          alt=""
          className="photo"
        />
      ))}
    </div>
  );
}
