import { Image } from "@/utils/digikam";

import ImageWithOverlay from "../image-with-overlay";

export default function Square({
  parentImage,
  groupImages,
}: {
  parentImage: Image;
  groupImages: Image[];
}) {
  if (groupImages.length !== 3) {
    console.warn(`❌ square group without 4 images: ${parentImage.src}`);
  }

  return (
    <div className="square-group">
      {[parentImage, ...groupImages].map((image) => (
        <div key={image.id} className="group-image-container">
          <ImageWithOverlay
            classNamePrefix="square-group"
            image={image}
            className="group-image"
            fill
          />
        </div>
      ))}
      {parentImage.title && <p className="image-title">{parentImage.title}</p>}
    </div>
  );
}
