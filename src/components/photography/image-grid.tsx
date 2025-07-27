import { Image } from "@/utils/digikam";
import NextImage from "next/image";
import "@/sass/components/image-grid.scss";

export default function ImageGrid({
  images,
  background,
  maxCols = 2,
}: {
  images: Image[];
  background?: React.CSSProperties["background"];
  maxCols?: number;
}) {
  if (images.length === 0) {
    return "no images :(";
  }
  return (
    <div
      className={`image-grid max-cols-${maxCols}`}
      style={background ? { background } : {}}
    >
      {images.map((image) => (
        <NextImage
          key={image.filename}
          src={image.src}
          height={image.height}
          width={image.width}
          alt=""
        />
      ))}
    </div>
  );
}
