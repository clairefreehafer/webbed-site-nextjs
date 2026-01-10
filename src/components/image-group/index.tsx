import "@/sass/images/image-group.scss";

import { Image } from "@/utils/digikam";

import ImageUrlTrigger from "../image-url-trigger";
import HoverGroup from "./hover";
import PyramidGroup from "./pyramid";
import SquareGroup from "./square";
import VerticalGroup from "./vertical";

export default function ImageGroup({
  allImages,
  parentImage,
}: {
  allImages: Image[];
  parentImage: Image;
}) {
  const { grouping } = parentImage;
  if (!Array.isArray(grouping)) {
    // image is a group child; do nothing.
    return null;
  }

  const groupImages = allImages.filter((image) => grouping.includes(image.id));

  if (parentImage.groupType === "hover") {
    const hoverImage = groupImages.find(
      (image) =>
        !Array.isArray(image.grouping) && image.grouping === parentImage.id
    );

    if (!hoverImage) {
      console.warn(
        `❌ could not determine \`hoverImage\` for ${parentImage.src}`
      );
      return null;
    }

    return (
      <div className="image-group-container">
        <HoverGroup baseImage={parentImage} hoverImage={hoverImage} />
      </div>
    );
  }

  if (parentImage.groupType === "vertical") {
    return (
      <div className="image-group-container">
        <VerticalGroup parentImage={parentImage} groupImages={groupImages} />
      </div>
    );
  }

  if (parentImage.groupType === "pyramid") {
    return (
      <div className="image-group-container">
        <PyramidGroup parentImage={parentImage} groupImages={groupImages} />
      </div>
    );
  }

  if (parentImage.groupType === "square") {
    return (
      <div className="image-group-container">
        <SquareGroup parentImage={parentImage} groupImages={groupImages} />
      </div>
    );
  }

  return (
    <div className="image-group-container">
      <div className="default-group">
        {[parentImage, ...groupImages].map((image) => (
          <div
            key={image.id}
            className="default-group-image-container"
            style={{
              aspectRatio: image.width / image.height,
            }}
          >
            <ImageUrlTrigger image={image} className="group-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
