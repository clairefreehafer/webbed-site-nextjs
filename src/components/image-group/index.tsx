import "@/sass/images/image-group.scss";

import { determineGroupType, Image } from "@/utils/digikam";
import logger from "@/utils/logger";

import ImageWithOverlay from "../image-with-overlay";
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
  const groupType = determineGroupType(grouping, parentImage.groupType);

  if (groupType === "horizontal") {
    return (
      <div className="horizontal-group">
        {[parentImage, ...groupImages].map((image) => (
          <div
            key={image.id}
            className="horizontal-group-image-container"
            style={{
              aspectRatio: image.width / image.height,
            }}
          >
            <ImageWithOverlay
              image={image}
              classNamePrefix="horizontal-group"
              className="horizontal-group-image"
              fill
            />
          </div>
        ))}
      </div>
    );
  }

  if (groupType === "hover") {
    const hoverImage = groupImages.find(
      (image) =>
        !Array.isArray(image.grouping) && image.grouping === parentImage.id,
    );

    if (!hoverImage) {
      logger.warn(
        `❌ could not determine \`hoverImage\` for ${parentImage.src}`,
      );
      return null;
    }

    return (
      <div className="image-group-container">
        <HoverGroup baseImage={parentImage} hoverImage={hoverImage} />
      </div>
    );
  }

  if (groupType === "vertical") {
    return (
      <VerticalGroup parentImage={parentImage} groupImages={groupImages} />
    );
  }

  // return null;

  if (groupType === "pyramid") {
    return (
      <div className="image-group-container">
        <PyramidGroup parentImage={parentImage} groupImages={groupImages} />
      </div>
    );
  }

  if (groupType === "square") {
    return (
      <div className="image-group-container">
        <SquareGroup parentImage={parentImage} groupImages={groupImages} />
      </div>
    );
  }

  return <p>could not determine group type.</p>;
}
