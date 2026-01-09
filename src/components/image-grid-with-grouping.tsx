import "@/sass/components/image-grid.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

function GroupRow({
  images,
  parentImage,
  groupImageIds,
}: {
  images: Image[];
  parentImage: Image;
  groupImageIds: Image["id"][];
}) {
  const groupImages = images.filter((image) =>
    groupImageIds.includes(image.id)
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        // alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      {[parentImage, ...groupImages].map((image) => (
        <div
          key={image.id}
          style={{
            position: "relative",
            aspectRatio: image.width / image.height,
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <NextImage
            key={image.id}
            src={image.src}
            fill
            alt=""
            id={image.id.toString()}
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ImageGridWithGrouping({
  images,
  background,
  maxCols = 1,
}: {
  images: Image[];
  background?: React.CSSProperties["background"];
  maxCols?: 1 | 2 | 3;
}) {
  if (images.length === 0) {
    return "no images :(";
  }
  return (
    <div className="image-grid-container">
      <ul
        className={`grid max-cols-${maxCols}`}
        style={{
          ...(background ? { background } : {}),
          gridTemplateRows: `repeat(${images.length}, 100%)`,
        }}
      >
        {images.map((image) => {
          if (typeof image.grouping === "number") {
            return null;
          }
          if (Array.isArray(image.grouping)) {
            return (
              <li key={image.filename} className="cell">
                <GroupRow
                  images={images}
                  parentImage={image}
                  groupImageIds={image.grouping}
                  key={image.id}
                />
              </li>
            );
          }
          return (
            <li key={image.filename} className="cell">
              <NextImage
                src={image.src}
                fill
                alt=""
                className="image-grid-image"
                id={image.id.toString()}
              />
              {image.title && <p className="image-title">{image.title}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
