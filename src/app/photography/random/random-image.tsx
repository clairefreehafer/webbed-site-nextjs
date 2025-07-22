"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function RandomImage({ allImages }: { allImages: string[] }) {
  const [imagePath, setImagePath] = useState<string>();

  useEffect(() => {
    if (!imagePath) {
      const randomImage =
        allImages[Math.floor(Math.random() * allImages.length)];
      setImagePath(randomImage);
    }
  }, []);

  if (!imagePath) {
    return null;
  }

  return (
    <div className="single-image">
      <Image src={imagePath} alt="" fill objectFit="contain" />
    </div>
  );
}
