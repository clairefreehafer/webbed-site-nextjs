"use client";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Image } from "@/utils/digikam";

type Props = Omit<NextImageProps, "src" | "alt"> & {
  image: Image;
};

export default function ImageUrlTrigger({ image, ...nextImageProps }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <NextImage
      {...nextImageProps}
      src={image.src}
      alt=""
      id={image.filename}
      onClick={() => router.replace(`${pathname}#${image.filename}`)}
      quality={100}
    />
  );
}
