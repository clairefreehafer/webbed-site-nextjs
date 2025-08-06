import "@/sass/components/slideshow.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

import SlideshowDate from "./slideshow-date";

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
              style={{ objectFit: "contain" }}
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
          {image.title && <p className="image-title">{image.title}</p>}
        </li>
      ))}
    </ol>
  );
}
