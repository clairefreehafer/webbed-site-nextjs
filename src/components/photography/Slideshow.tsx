"use client";

import { Prisma } from "@prisma/client";
import { sizePhoto } from "@utils/smugmug";
import { getPhotographyAlbumPhotos } from "@utils/prisma/album";
import { getPhotosWithTag } from "@utils/prisma/tag";
import { getSmugmugPhotos } from "@utils/smugmug";
import { useEffect, useState } from "react";
import { css, cva, cx } from "@panda/css";
import { fullScreen } from "@styles/layout";

const FADE_DELAY = 500;

const main = cx(
  css(fullScreen),
  css({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    p: "1rem",
  })
);

// {`${animateOut && "animate-fade-out-500"} ${animateIn && "animate-fade-in-500"} animation-fill-mode:forwards]`}
const image = css({
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
});

const slideNav = cva({
  base: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    width: "auto",
  },
  variants: {
    direction: {
      backwards: {
        left: 0,
      },
      forwards: {
        right: 0,
      },
    },
  },
});

type Props = {
  photos:
    | Prisma.PromiseReturnType<typeof getPhotographyAlbumPhotos>["photos"]
    | Prisma.PromiseReturnType<typeof getPhotosWithTag>
    | Prisma.PromiseReturnType<typeof getSmugmugPhotos>;
};

// TODO: add randomized order, tag filtering

export default function Slideshow({ photos }: Props) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    let timeout;

    setCurrentPhoto(photos[currentPhotoIndex]);

    // give the new image time to load
    timeout = setTimeout(() => {
      setAnimateIn(true);
      setAnimateOut(false);
    }, FADE_DELAY);

    return () => clearTimeout(timeout);
  }, [photos, currentPhotoIndex]);

  function handleArrowClick(direction: "backwards" | "forward") {
    setAnimateOut(true);

    if (direction === "backwards") {
      setTimeout(() => setCurrentPhotoIndex(currentPhotoIndex - 1), FADE_DELAY);
    } else {
      setTimeout(() => setCurrentPhotoIndex(currentPhotoIndex + 1), FADE_DELAY);
    }
  }

  return (
    <main className={main}>
      <img
        src={sizePhoto(currentPhoto?.url, "XL")}
        alt={currentPhoto?.altText || ""}
        className={image}
      />
      {currentPhotoIndex > 0 && (
        <button
          type="button"
          onClick={() => handleArrowClick("backwards")}
          className={slideNav({ direction: "backwards" })}
        >
          &larr;
        </button>
      )}
      {currentPhotoIndex < photos.length - 1 && (
        <button
          type="button"
          onClick={() => handleArrowClick("forward")}
          className={slideNav({ direction: "forwards" })}
        >
          &rarr;
        </button>
      )}
    </main>
  );
}
