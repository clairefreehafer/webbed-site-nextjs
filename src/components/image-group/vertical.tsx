import { Image } from "@/utils/digikam";

import ImageWithOverlay from "../image-with-overlay";

export default function VerticalGroup({
  parentImage,
  groupImages,
}: {
  parentImage: Image;
  groupImages: Image[];
}) {
  return (
    <div className="vertical-group">
      {[parentImage, ...groupImages].map((image) => (
        <div key={image.id} className="vertical-group-image-container">
          <ImageWithOverlay
            image={image}
            classNamePrefix="vertical-group"
            fill
          />
        </div>
      ))}
      {parentImage.title && <p className="image-title">{parentImage.title}</p>}
    </div>
  );
}
