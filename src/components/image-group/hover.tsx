import NextImage from "next/image";

import { Image } from "@/utils/digikam";

import ImageWithOverlay from "../image-with-overlay";

export default function HoverImage({
  baseImage,
  hoverImage,
}: {
  baseImage: Image;
  hoverImage: Image;
}) {
  return (
    <div
      key={baseImage.id}
      className="hover-group"
      style={{
        aspectRatio: baseImage.width / baseImage.height,
      }}
    >
      <ImageWithOverlay
        classNamePrefix="hover-group"
        image={baseImage}
        className="base-image"
        fill
      />
      <NextImage
        key={hoverImage.id}
        src={hoverImage.src}
        alt=""
        className="hover-image"
        fill
      />
    </div>
  );
}
