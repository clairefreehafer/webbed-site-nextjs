import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const botwAlbums = getAlbums("breath of the wild");
  // const botwAlbums = getAlbums("breath of the wild");
  return (
    <>
      <Image
        src="/images/zelda/pad-line-1.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
      <h2>tears of the kingdom</h2>
      <Image
        src="/images/zelda/pad-line-2.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
      <h2>breath of the wild</h2>
      <ul>
        {botwAlbums.map((album) => (
          <li key={album.slug}>
            <Link href={`/zelda/breath-of-the-wild/${album.slug}`}>
              {album.displayName ?? deslugify(album.slug)}
            </Link>
          </li>
        ))}
      </ul>
      <Image
        src="/images/zelda/pad-line-3.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
    </>
  );
}
