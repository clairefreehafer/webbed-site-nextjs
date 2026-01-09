import NextImage from "next/image";

import { Image } from "@/utils/digikam";

export default function ImageGroup({
  images,
  parentImage,
}: {
  images: Image[];
  parentImage: Image;
}) {
  const { grouping } = parentImage;
  if (!Array.isArray(grouping)) {
    return null;
  }

  const groupImages = images.filter((image) => grouping.includes(image.id));

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        justifyContent: "space-around",
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
