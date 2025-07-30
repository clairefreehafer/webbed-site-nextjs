import { Album } from "@/utils/digikam";
import NextImage from "next/image";
import "@/sass/components/image-grid.scss";
import Link from "next/link";
import { deslugify } from "@/utils";

export default function ImageGridLinks({
  albums,
  maxCols = 2,
  aspectRatio = "4/3",
}: {
  albums: Album[];
  maxCols?: 1 | 2 | 3;
  aspectRatio?: "1/1" | "4/3" | "16/9";
}) {
  return (
    <ul className={`image-grid max-cols-${maxCols}`}>
      {albums.map((album) => (
        <li key={album.slug} className="image-cell">
          <Link href={`/photography/albums/${album.slug}`}>
            {
              <NextImage
                // tv-static image from: https://giphy.com/gifs/vhs-static-blank-3o6vXRxrhj7Ov94Gbu
                src={
                  album.coverPhoto?.src ?? "/images/photography/tv-static.webp"
                }
                height={album.coverPhoto?.height ?? 500}
                width={album.coverPhoto?.width ?? 375}
                alt=""
                className="image-grid-links-image"
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
