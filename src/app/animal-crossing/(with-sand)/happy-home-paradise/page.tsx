import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "animal crossing happy home paradise",
};

export default async function Page() {
  const albums = await getAlbums("happy-home-paradise");

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <h2>happy home paradise</h2>
      </div>

      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.slug} style={{ gap: "0.5rem" }}>
            <Image
              src={`/images/animal-crossing/icons/${album.slug}.png`}
              alt=""
              height={128}
              width={128}
              style={{ height: "3rem", width: "3rem" }}
            />
            <Link href={`/animal-crossing/happy-home-paradise/${album.slug}`}>
              {album.displayName ?? deslugify(album.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
