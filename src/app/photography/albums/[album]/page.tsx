import { deslugify, slugify } from "@/utils";
import { getAlbum, getAlbums } from "@/utils/photography/digikam";
import Image from "next/image";
import fs from "fs";
import sharp from "sharp";

export const dynamicParams = false;

export async function generateStaticParams() {
  const albums = getAlbums();

  return albums.map((album) => ({
    album: slugify(album.relativePath.slice(1)),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  const images = getAlbum(deslugify(albumSlug));

  console.log(images[0]);

  return (
    <div className="grid">
      {images.map(async (image) => {
        if (!image.path) {
          console.log(`😢 no path for ${image.name}.`);
          return null;
        }
        const buffer = fs.readFileSync(image.path);
        const base64 = (await sharp(buffer).webp().toBuffer()).toString(
          "base64"
        );
        return (
          <Image
            key={image.id}
            src={`data:image/webp;base64,${base64}`}
            height={image.height}
            width={image.width}
            alt=""
            className="photo"
          />
        );
      })}
    </div>
  );
}
