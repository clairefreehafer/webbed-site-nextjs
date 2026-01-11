import { Image } from "@/utils/digikam";

import ImageUrlTrigger from "../image-url-trigger";

export default function Pyramid({
  parentImage,
  groupImages,
}: {
  parentImage: Image;
  groupImages: Image[];
}) {
  return (
    <div className="pyramid-group">
      {[parentImage, ...groupImages].map((image, index) => (
        <div
          key={image.id}
          className="group-image-container"
          style={index === 0 ? { gridColumn: "1 / 3" } : {}}
        >
          <ImageUrlTrigger
            key={image.id}
            image={image}
            className="group-image"
            fill
          />
        </div>
      ))}
    </div>
  );
}
