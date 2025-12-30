import Image from "next/image";
import Link from "next/link";

import { deslugify } from "@/utils";
import { getAstrologyDateRange } from "@/utils/animal-crossing";
import { getAlbums } from "@/utils/digikam";

export default async function Page() {
  const albums = await getAlbums("new-horizons/dreams");

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
        <Link href="/animal-crossing/new-horizons">new horizons</Link>
        <span>/</span>
        <h2>dreams</h2>
      </div>

      <p>photos from the dream suite.</p>

      <p>under construction.</p>

      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.slug} style={{ gap: "0.5rem" }}>
            <Image
              src={`/images/animal-crossing/icons/star_fragment_${
                getAstrologyDateRange(
                  album.date ? new Date(album.date) : undefined
                ).dateRange
              }.png`}
              alt=""
              height={128}
              width={128}
              style={{ height: "3rem", width: "3rem" }}
            />
            <Link href={`/animal-crossing/new-horizons/${album.slug}`}>
              {album.displayName ?? deslugify(album.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
