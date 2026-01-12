import { Image } from "@/utils/digikam";

import ImageGroup from "../image-group";
import ImageWithOverlay from "../image-with-overlay";
import SlideshowDate from "./date";
import Details from "./details";

export default function Slide({
  image,
  images,
  index,
}: {
  image: Image;
  images: Image[];
  index: number;
}) {
  // don't show a slide for images that are a group child.
  if (typeof image.grouping === "number") {
    return null;
  }

  // image is a group parent.
  if (Array.isArray(image.grouping)) {
    return (
      <li
        className="slide"
        style={image.background ? { background: image.background } : {}}
      >
        <div className="snap-point" />

        <ImageGroup allImages={images} parentImage={image} />
      </li>
    );
  }

  // image is standalone.
  return (
    <li
      className="slide"
      style={image.background ? { background: image.background } : {}}
    >
      <div className="snap-point" />

      <div className="single-image-container">
        <ImageWithOverlay
          image={image}
          classNamePrefix="single"
          fill
          style={{
            maxHeight: image.height,
            maxWidth: image.width,
          }}
          priority={index === 0}
        />

        {image.showDate && (
          <SlideshowDate
            date={image.dateTaken}
            imageWidth={image.width}
            imageHeight={image.height}
            filename={image.filename}
          />
        )}
      </div>

      <Details image={image} />
    </li>
  );
}
