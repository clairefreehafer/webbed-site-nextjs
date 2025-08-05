import "@/sass/components/slideshow.scss";

import { Image } from "@/utils/digikam";

type SlideshowProps = {
  images: Image[];
};

export default function Slideshow({ images }: SlideshowProps) {
  return (
    <ol className="slides">
      {images.map((image, idx) => (
        <li className="slide" key={image.filename} id={`${idx + 1}`}>
          <div className="snap-point" />
          <div
            className="image"
            style={{ backgroundImage: `url('${image.src}')` }}
          />
          {image.title && <p className="image-title">{image.title}</p>}
        </li>
      ))}
    </ol>
  );
}
