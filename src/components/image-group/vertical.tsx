import { Image } from "@/utils/digikam";

import ImageUrlTrigger from "../image-url-trigger";

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
          <ImageUrlTrigger image={image} className="group-image" fill />
        </div>
      ))}
      {parentImage.title && <p className="image-title">{parentImage.title}</p>}
    </div>
  );
}
