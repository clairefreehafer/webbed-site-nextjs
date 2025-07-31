import { Album } from "@/utils/digikam";
import NextImage from "next/image";
import Link from "next/link";
import { deslugify } from "@/utils";

export default function AlbumGrid({
  albums,
  linkPrefix,
  maxCols = 3,
  aspectRatio = "4/3",
}: {
  albums: Album[];
  linkPrefix: string;
  maxCols?: 1 | 2 | 3;
  aspectRatio?: "1/1" | "4/3" | "16/9";
}) {
  return (
    <ul className={`grid max-cols-${maxCols}`}>
      {albums.map((album) => (
        <li key={album.slug} className="cell">
          <Link href={`/photography/${linkPrefix}/${album.slug}`}>
            {
              <NextImage
                // tv-static image from: https://giphy.com/gifs/vhs-static-blank-3o6vXRxrhj7Ov94Gbu
                src={
                  album.coverPhoto?.src ?? "/images/photography/tv-static.webp"
                }
                height={album.coverPhoto?.height ?? 500}
                width={album.coverPhoto?.width ?? 375}
                alt=""
                className="album-grid-image"
                style={{
                  aspectRatio,
                  objectPosition: album.coverPhoto?.position,
                }}
              />
            }
            <p className="image-title">
              {album.displayName ?? deslugify(album.slug)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
