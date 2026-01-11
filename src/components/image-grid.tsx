import "@/sass/components/image-grid.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

export default function ImageGrid({
  images,
  background,
  maxCols = 2,
}: {
  images: Image[];
  background?: React.CSSProperties["background"];
  maxCols?: 1 | 2 | 3;
}) {
  if (images.length === 0) {
    return "no images :(";
  }
  return (
    <div
      className="image-grid-container"
      style={background ? { background } : {}}
    >
      <ul className={`grid max-cols-${maxCols}`}>
        {images.map((image) => (
          <li key={image.filename} className="cell">
            <NextImage
              src={image.src}
              height={image.height}
              width={image.width}
              alt=""
              className="image-grid-image"
              id={image.id.toString()}
            />
            {image.title && <p className="image-title">{image.title}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
