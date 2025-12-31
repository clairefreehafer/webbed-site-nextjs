import "@/sass/components/slideshow.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

// import SlideshowDate from "./slideshow-date";

function renderDetails(image: Image) {
  if (image.albumCollection === "tears-of-the-kingdom") {
    return (
      <div className="image-details-container">
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
              width={image.width}
              height={image.height}
              alt=""
              style={{
                width: "auto",
                height: "auto",
                alignSelf: "center",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              priority={idx === 0}
            />
          </div>
          {renderDetails(image)}
        </li>
      ))}
    </ol>
  );
}
