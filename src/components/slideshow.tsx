import "@/sass/components/slideshow.scss";

import NextImage from "next/image";

import { Image } from "@/utils/digikam";

import SlideshowDate from "./slideshow-date";

type SlideshowProps = {
  images: Image[];
};

export default function Slideshow({ images }: SlideshowProps) {
  return (
    <ol className="slides">
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
