import "@/sass/components/slideshow.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

import SlideshowDate from "./slideshow-date";

function renderDetails(image: Image) {
  if (image.albumCollection === "tears-of-the-kingdom") {
    return (
      <div className="image-details">
        {image.compendiumNumber && (
          <p className="compendium-number" title="compendium number">
            {image.compendiumNumber}
          </p>
        )}

        {image.icon && (
          <NextImage
            src={`/images/zelda/icons/${image.icon}.svg`}
            alt=""
            width={47}
            height={47}
            style={{ height: "2rem", width: "2rem" }}
          />
        )}
        {image.title}
      </div>
    );
  }
  if (image.title) {
    return <p className="image-title">{image.title}</p>;
  }
  return null;
}

export default function Slideshow({
  images,
  albumDescription,
}: {
  images: Image[];
  albumDescription?: string;
}) {
  return (
    <ol className="slides">
      {albumDescription && (
        <li className="slide">
          <div className="snap-point" />
          <p>{albumDescription}</p>
          <p>{images.length} images</p>
          <p className="swipe-to-view">swipe to view &rarr;</p>
          <p className="scroll-to-view">scroll to view &rarr;</p>
        </li>
      )}
      {images.map((image, idx) => (
        <li className="slide" key={image.filename} id={`${idx + 1}`}>
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
              priority={idx === 0}
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
          <div className="image-details-container">{renderDetails(image)}</div>
        </li>
      ))}
    </ol>
  );
}
