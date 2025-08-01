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
  }, []);

  if (!imagePath) {
    return null;
  }

  function handleClick() {
    setImagePath(getRandomImage());
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        refresh
      </button>
      <div className="single-image">
        <Image src={imagePath} alt="" fill objectFit="contain" />
      </div>
    </>
  );
}
