"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function RandomImage({ allImages }: { allImages: string[] }) {
  const [imagePath, setImagePath] = useState<string>();

  const getRandomImage = useCallback(() => {
    return allImages[Math.floor(Math.random() * allImages.length)];
  }, [allImages]);

  useEffect(() => {
    if (!imagePath) {
      const randomImage = getRandomImage();
      setImagePath(randomImage);
    }
  }, [getRandomImage, imagePath]);

  if (!imagePath) {
    console.warn("could not get a random image.");
    return null;
  }

  function handleClick() {
    setImagePath(getRandomImage());
  }

  return (
    <>
      <div className="single-image">
        <Image src={imagePath} alt="" fill />
      </div>

      <button type="button" onClick={handleClick}>
        refresh
      </button>
    </>
  );
}
