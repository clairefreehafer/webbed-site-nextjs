import NookPhone from "@/components/animal-crossing/nookphone";
import { deslugify, slugify } from "@/utils";
import { getAstrologyDateRange } from "@/utils/animal-crossing";
import { getAlbums } from "@/utils/digikam";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import animalCrossingTagsJson from "@/data/animal-crossing-tags.json";
import React from "react";
import { AnimalCrossingTags } from "@/utils/types";

const animalCrossingTags: AnimalCrossingTags = animalCrossingTagsJson;

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
      <p>view photos from my animal crossing: new horizons island, Avalar:</p>
      <ul
        style={{
          padding: 0,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          columnGap: "1rem",
          justifyContent: "center",
        }}
      >
        {albums.map((album) => (
          <li
            key={album.slug}
            style={{ display: "flex", alignItems: "center" }}
          >
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
      {Object.keys(animalCrossingTags).map((tagCategory) => (
        <React.Fragment key={tagCategory}>
          <h3>{tagCategory}</h3>
          <ul
            style={{
              padding: 0,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "1rem",
              justifyContent: "center",
            }}
          >
            {animalCrossingTags[tagCategory].map((character) => (
              <li
                key={character}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Image
                  src={`/images/animal-crossing/icons/${slugify(
                    character
                  )}.png`}
                  alt=""
                  height={128}
                  width={128}
                  style={{ height: "2.5rem", width: "2.5rem" }}
                />
                <Link
                  href={`/animal-crossing/new-horizons/${slugify(character)}`}
                >
                  {character}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
      <p>
        and check out this nook phone i built and don&apos;t know what to do
        with:
      </p>
      <NookPhone />
    </>
  );
}
