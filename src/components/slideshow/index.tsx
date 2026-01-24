import "@/sass/components/slideshow.scss";

import { Fragment } from "react";

import { slugify } from "@/utils";
import { Album, Image } from "@/utils/digikam";

import Slide from "./slide";
import TitleSlide from "./title-slide";

export default function Slideshow({
  images,
  album,
}: {
  images: Image[];
  album?: Album;
}) {
  return (
    <ol id="slideshow" className="slides">
      <TitleSlide album={album} images={images} />

      {images.map((image, idx) => (
        <Fragment key={image.id}>
          {image.titleCard && (
            <li className="slide title-card" id={slugify(image.titleCard)}>
              <div className="snap-point" />
              <h3>{image.titleCard}</h3>
            </li>
          )}
          <Slide image={image} index={idx} images={images} />
        </Fragment>
      ))}
    </ol>
  );
}
