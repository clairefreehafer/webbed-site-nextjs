import NextImage from "next/image";

import { Image } from "@/utils/digikam";

import ImageGroup from "../image-group";
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
  if (typeof image.grouping === "number") {
    return null;
  }

  if (Array.isArray(image.grouping)) {
    return (
      <li className="slide" id={`${index + 1}`}>
        <div className="snap-point" />

        <ImageGroup images={images} parentImage={image} />
      </li>
    );
  }

  return (
    <li className="slide" id={`${index + 1}`}>
      <div className="snap-point" />

      <div className="image" id={image.filename}>
        <NextImage
          src={image.src}
          fill
          alt=""
          style={{
            maxHeight: image.height,
            maxWidth: image.width,
            objectFit: "contain",
            alignSelf: "center",
            justifySelf: "center",
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
