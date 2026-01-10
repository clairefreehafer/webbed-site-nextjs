import { Image } from "@/utils/digikam";

import ImageUrlTrigger from "../image-url-trigger";

export default function Square({
  parentImage,
  groupImages,
}: {
  parentImage: Image;
  groupImages: Image[];
}) {
  return (
    <div className="square-group">
      {[parentImage, ...groupImages].map((image) => (
        <div key={image.id} className="group-image-container">
          <ImageUrlTrigger
            key={image.id}
            image={image}
            className="group-image"
          />
        </div>
      ))}
    </div>
  );
}
