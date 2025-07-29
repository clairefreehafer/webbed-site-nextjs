import { Image } from "@/utils/digikam";
import "@/sass/slideshow.scss";
import NextImage from "next/image";

type SlideshowProps = {
  images: Image[];
};

export default function Slideshow({ images }: SlideshowProps) {
  return (
    <ol className="slides">
      {images.map((image, idx) => (
        <li
          className="slide"
          key={image.filename}
          id={`${idx + 1}`}
          style={image.background ? { background: image.background } : {}}
        >
          <div className="snap-point" />
          <NextImage
            src={image.src}
            alt={""}
            id={`image-${idx + 1}`}
            className="image"
            height={image.height}
            width={image.width}
            style={image.border ? { border: image.border } : {}}
          />
          {image.title && <p className="image-title">{image.title}</p>}
        </li>
      ))}
    </ol>
  );
}
