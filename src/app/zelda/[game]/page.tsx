import Image from "next/image";
import Link from "next/link";

import SheikahUnderline from "@/components/zelda/sheikah-underline";
import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

export async function generateStaticParams() {
  return [{ game: "breath-of-the-wild" }, { game: "tears-of-the-kingdom" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const botwAlbums = await getAlbums(game);

  return (
    <div className="container">
      <Image
        src="/images/zelda/pad-line-1.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
      <h2>{deslugify(game)}</h2>
      <ul>
        {botwAlbums.map((album) => (
          <li key={album.slug}>
            <SheikahUnderline
              text={album.displayName ?? deslugify(album.slug)}
              textSize="0.6rem"
              gap="0.1rem"
            >
              <Link href={`/zelda/breath-of-the-wild/${album.slug}`}>
                {album.displayName ?? deslugify(album.slug)}
              </Link>
            </SheikahUnderline>
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
    </div>
  );
}
