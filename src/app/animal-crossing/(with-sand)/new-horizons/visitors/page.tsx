import Image from "next/image";
import Link from "next/link";

import animalCrossingTagsJson from "@/data/animal-crossing-tags.json";
import { AnimalCrossingTags } from "@/types/animal-crossing";
import { slugify } from "@/utils";

const animalCrossingTags: AnimalCrossingTags = animalCrossingTagsJson;

export default function Page() {
  const { visitors } = animalCrossingTags;

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
        <h2>visitors</h2>
      </div>

      <p>photos of visitors avalar has hosted.</p>

      <ul className="album-list">
        {visitors.map((character) => (
          <li key={character} style={{ gap: "0.5rem" }}>
            <Image
              src={`/images/animal-crossing/icons/${slugify(character)}.png`}
              alt=""
              height={128}
              width={128}
              style={{ height: "2.5rem", width: "2.5rem" }}
            />
            <Link href={`/animal-crossing/new-horizons/${slugify(character)}`}>
              {character}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
