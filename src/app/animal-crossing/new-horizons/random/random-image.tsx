"use client";

import NextImage from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useGrassContext } from "@/utils/animal-crossing/grass";
import { Image } from "@/utils/digikam";

export default function RandomImage({ allImages }: { allImages: Image[] }) {
  const [image, setImage] = useState<Image>();
  const { setGrass } = useGrassContext();

  const getRandomImage = useCallback(() => {
    return allImages[Math.floor(Math.random() * allImages.length)];
  }, [allImages]);

  useEffect(() => {
    if (!image) {
      const randomImage = getRandomImage();
      setImage(randomImage);
      setGrass({ shape: "triangle", date: new Date(randomImage.dateTaken) });
    }
  }, [getRandomImage, image, setGrass]);

  if (!image) {
    return null;
  }

  function handleClick() {
    const randomImage = getRandomImage();
    setImage(randomImage);
    setGrass({ shape: "triangle", date: new Date(randomImage.dateTaken) });
  }

  return (
    <>
      <div className="single-image">
        <NextImage
          src={image.src}
          alt=""
          fill
          objectFit="contain"
          className="image"
        />
      </div>

      <button type="button" onClick={handleClick} className="refresh-button">
        refresh
      </button>
    </>
  );
}
