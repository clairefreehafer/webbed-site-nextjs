"use client";

import { Prisma } from "@prisma/client";
import { sizePhoto } from "@utils/smugmug";
import { getPhotographyAlbumPhotos } from "@utils/prisma/album";
import { getPhotosWithTag } from "@utils/prisma/tag";
import { getSmugmugPhotos } from "@utils/smugmug";
import { useEffect, useState } from "react";

const FADE_DELAY = 500;

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

  function handleArrowClick(direction: "back" | "forward") {
    setAnimateOut(true);

    if (direction === "back") {
      setTimeout(() => setCurrentPhotoIndex(currentPhotoIndex - 1), FADE_DELAY);
    } else {
      setTimeout(() => setCurrentPhotoIndex(currentPhotoIndex + 1), FADE_DELAY);
    }
  }

  return (
    <main className="flex h-screen w-screen justify-center p-4 align-middle">
      <img
        src={sizePhoto(currentPhoto?.url, "XL")}
        alt={currentPhoto?.altText || ""}
        className={`${animateOut && "animate-fade-out-500"} ${animateIn && "animate-fade-in-500"} max-w-full object-contain [animation-fill-mode:forwards]`}
      />
      {currentPhotoIndex > 0 && (
        <button
          type="button"
          onClick={() => handleArrowClick("back")}
          className="fixed left-0 top-1/2 translate-y-[-50%] text-5xl"
        >
          &larr;
        </button>
      )}
      {currentPhotoIndex < photos.length - 1 && (
        <button
          type="button"
          onClick={() => handleArrowClick("forward")}
          className="fixed right-0 top-1/2 translate-y-[-50%] text-5xl"
        >
          &rarr;
        </button>
      )}
    </main>
  );
}
