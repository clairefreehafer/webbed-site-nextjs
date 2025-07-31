import NookPhone from "@/components/animal-crossing/nookphone";
import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "animal crossing new horizons — claire freehafer",
};

export default async function Page() {
  const albums = await getAlbums("animal-crossing/new-horizons");
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <h2>new horizons</h2>
      </div>
      <p>view photos from my new horizons island, Avalar:</p>
      <ul>
        {albums.map((album) => (
          <li key={album.slug}>
            <Link href={`/animal-crossing/new-horizons/${album.slug}`}>
              {album.displayName ?? deslugify(album.slug)}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        and check out this nook phone i built and don&apos;t know what to do
        with:
      </p>
      <NookPhone />
    </>
  );
}
