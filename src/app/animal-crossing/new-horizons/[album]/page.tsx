import Link from "next/link";

import Slideshow from "@/components/slideshow";
import animalCrossingTagsJson from "@/data/animal-crossing-tags.json";
import { deslugify, slugify } from "@/utils";
import { Grass } from "@/utils/animal-crossing/grass";
import {
  getAlbumDate,
  getAlbumImages,
  getAlbums,
  getTagImages,
} from "@/utils/digikam";
import { AnimalCrossingTags } from "@/utils/types";

const animalCrossingTags: AnimalCrossingTags = animalCrossingTagsJson;

export async function generateStaticParams() {
  const params = [];

  const albums = await getAlbums("new-horizons");
  for (const album of albums) {
    console.log(`├ generating /animal-crossing/new-horizons/${album.slug}`);
    params.push({ album: album.slug });
  }

  for (const category of Object.keys(animalCrossingTags)) {
    for (const character of animalCrossingTags[category]) {
      console.log(
        `├ generating /animal-crossing/new-horizons/${slugify(character)}`
      );
      params.push({ album: slugify(character) });
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
  let images = await getAlbumImages(albumSlug, "new-horizons");
  let date = getAlbumDate(albumSlug);
  if (images.length === 0) {
    // if no images in the album, check the tag.
    images = await getTagImages(deslugify(albumSlug), "new-horizons");
  }
  if (!date) {
    // if no album date (cuz tag), use the date of the first image
    date = images[0].dateTaken;
  }
  return (
    <>
      <Grass shape="triangle" date={new Date(date)} />
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
