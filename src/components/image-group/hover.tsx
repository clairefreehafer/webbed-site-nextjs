import { Image } from "@/utils/digikam";

import ImageUrlTrigger from "../image-url-trigger";

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
      <ImageUrlTrigger
        key={baseImage.id}
        image={baseImage}
        className="base-image"
      />
      <ImageUrlTrigger
        key={hoverImage.id}
        image={hoverImage}
        className="hover-image"
      />
    </div>
  );
}
