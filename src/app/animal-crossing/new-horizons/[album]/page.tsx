import { getAlbumImages, getAlbums, getTagImages } from "@/utils/digikam";
import { deslugify } from "@/utils";
import Slideshow from "@/components/slideshow";
import Link from "next/link";
import { AnimalCrossingTags } from "@/utils/types";
import animalCrossingTagsJson from "@/data/animal-crossing-tags.json";

const animalCrossingTags: AnimalCrossingTags = animalCrossingTagsJson;

export async function generateStaticParams() {
  const params = [];

  const albums = await getAlbums("animal-crossing/new-horizons");
  for (const album of albums) {
    console.log(`├ generating /animal-crossing/new-horizons/${album.slug}`);
    params.push({ album: album.slug });
  }

  for (const category of Object.keys(animalCrossingTags)) {
    for (const character of animalCrossingTags[category]) {
      console.log(`├ generating /animal-crossing/new-horizons/${character}`);
      params.push({ album: character });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  return { title: `${deslugify(albumSlug)} — claire freehafer` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  let images = await getAlbumImages(albumSlug);
  if (images.length === 0) {
    images = await getTagImages(albumSlug);
  }
  return (
    <>
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/animal-crossing">animal crossing</Link>
          <span>/</span>
          <Link href="/animal-crossing/new-horizons">new horizons</Link>
          <span>/</span>
          <h2>{deslugify(albumSlug)}</h2>
        </div>
      </div>
      <Slideshow images={images} />
    </>
  );
}
