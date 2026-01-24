import "@/sass/components/slideshow.scss";

import Link from "next/link";
import { Fragment } from "react";

import { deslugify, slugify } from "@/utils";
import { Album, Image } from "@/utils/digikam";

import Slide from "./slide";

export default function Slideshow({
  images,
  album,
}: {
  images: Image[];
  album: Album;
}) {
  const allTitleCards = images.reduce<string[]>((arr, image) => {
    if (image.titleCard) {
      arr.push(image.titleCard);
    }
    return arr;
  }, []);

  const { description, displayName, slug } = album;

  return (
    <ol id="slideshow" className="slides">
      {(description || allTitleCards.length > 0) && (
        <li className="slide info-slide">
          <div className="snap-point" />
          <h1>{displayName ?? deslugify(slug ?? "")}</h1>
          {description && <p>{description}</p>}
          <p>{images.length} images</p>

          <p className="swipe-to-view">swipe to view &rarr;</p>
          <p className="scroll-to-view">scroll to view &rarr;</p>

          {allTitleCards.length > 0 && (
            <div>
              <p>skip to:</p>
              <ul>
                {allTitleCards.map((titleCard) => (
                  <li key={titleCard}>
                    <Link
                      href={`/photography/albums/${slug}#${slugify(titleCard)}`}
                    >
                      {titleCard}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      )}

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
