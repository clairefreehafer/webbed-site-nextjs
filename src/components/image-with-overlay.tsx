"use client";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Image } from "@/utils/digikam";

import Overlay from "./slideshow/overlay";

type Props = Omit<NextImageProps, "src" | "alt"> & {
  classNamePrefix: string;
  image: Image;
};

export default function ImageWithOverlay({
  image,
  classNamePrefix,
  ...nextImageProps
}: Props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <NextImage
        {...nextImageProps}
        src={image.src}
        alt=""
        id={image.filename}
        className={`${classNamePrefix}-image ${
          showOverlay ? "overlay-visible" : ""
        }`}
        onClick={() => {
          setShowOverlay(!showOverlay);
          router.replace(`${pathname}#${image.filename}`);
        }}
      />

      <Overlay
        image={image}
        classNamePrefix={classNamePrefix}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
    </>
  );
}
