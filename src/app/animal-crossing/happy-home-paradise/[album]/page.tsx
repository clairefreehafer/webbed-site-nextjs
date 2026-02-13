import { Metadata } from "next";
import Link from "next/link";

import Slideshow from "@/components/slideshow";
import { deslugify } from "@/utils";
import { Grass } from "@/utils/animal-crossing/grass";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

type Params = { album: string };

export async function generateStaticParams() {
  const params = [];

  const albums = await getAlbums("happy-home-paradise");
  for (const album of albums) {
    params.push({ album: album.slug });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const albumSlug = (await params).album;
  return { title: deslugify(albumSlug) };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const albumSlug = (await params).album;
  const images = await getAlbumImages(albumSlug, "happy-home-paradise");
  const albums = await getAlbums("happy-home-paradise");
  const album = albums.find((a) => a.slug === albumSlug);

  if (!album) {
    throw new Error(`couldn't find album ${albumSlug}`);
  }

  return (
    <>
      <Grass shape="triangle" date={new Date(album.date)} />
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/animal-crossing">animal crossing</Link>
          <span>/</span>
          <Link href="/animal-crossing/happy-home-paradise">
            happy home paradise
          </Link>
          <span>/</span>
          <h2>{deslugify(albumSlug)}</h2>
        </div>
      </div>

      <Slideshow images={images} album={album} />
    </>
  );
}
