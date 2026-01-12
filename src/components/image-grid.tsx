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
    <div id="image-grid-container" style={background ? { background } : {}}>
      <ul className={`grid max-cols-${maxCols}`}>
        {images.map((image, index) => (
          <li key={image.filename} className="cell">
            <NextImage
              src={image.src}
              height={image.height}
              width={image.width}
              alt=""
              className="image-grid-image"
              id={image.id.toString()}
              // add padding to last image to pad out bottom of grid
              style={
                index === images.length - 1 ? { paddingBottom: "1rem" } : {}
              }
            />
            {image.title && <p className="image-title">{image.title}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
