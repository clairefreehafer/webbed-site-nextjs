import { Image } from "@/utils/digikam";

import ImageWithOverlay from "../image-with-overlay";

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
          <ImageWithOverlay
            classNamePrefix="pyramid-group"
            image={image}
            fill
          />
        </div>
      ))}
    </div>
  );
}
