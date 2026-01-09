import "@/sass/components/slideshow.scss";

import { Image } from "@/utils/digikam";

import Slide from "./slide";

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
        <Slide image={image} index={idx} key={image.id} images={images} />
      ))}
    </ol>
  );
}
