import "@/sass/components/album-grid.scss";

import NextImage from "next/image";
import Link from "next/link";

import { deslugify } from "@/utils";
import { Album } from "@/utils/digikam";

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
    <div id="album-grid">
      <ul className={`grid max-cols-${maxCols}`}>
        {albums.map((album) => (
          <li key={album.slug} className="cell">
            <Link href={`/photography/${linkPrefix}/${album.slug}`}>
              <div className="image-container">
                <NextImage
                  // tv-static image from: https://giphy.com/gifs/vhs-static-blank-3o6vXRxrhj7Ov94Gbu
                  src={
                    album.coverPhoto?.src ??
                    "/images/photography/tv-static.webp"
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
                {album.numberOfPhotos !== undefined && (
                  <div className="image-overlay">
                    <p>
                      {album.numberOfPhotos === 1
                        ? "1 photo"
                        : `${album.numberOfPhotos} photos`}
                    </p>
                  </div>
                )}
              </div>
              <p className="album-title">
                {album.displayName ?? deslugify(album.slug)}
                {album.icon && (
                  <span className="album-icon"> {album.icon}</span>
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
