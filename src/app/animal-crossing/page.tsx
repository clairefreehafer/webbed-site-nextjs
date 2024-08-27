import IconList from "@components/IconList";
import { getIconListAlbums } from "@utils/prisma/album";

// for future reference
const newHorizonsSections = [
  "residents",
  "visitors",
  "events", // "dreams",
  // "landscapes", "interiors",
  // "misc", "random",
  // "new", "all"
];

async function Section({ section }: { section: string }) {
  const albums = await getIconListAlbums(section);

  return (
    <div>
      <h4 className="drop-shadow-text border-brown my-4 border-b-4 border-dashed pb-2 text-center text-xl">
        {section}
      </h4>
      <IconList albums={albums} theme="animalCrossing" />
    </div>
  );
}

export default async function AnimalCrossing() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <h3 className="drop-shadow-text text-center text-2xl sm:col-span-2">
        new horizons
      </h3>

      {newHorizonsSections.map((section) => (
        <Section section={section} key={section} />
      ))}
    </div>
  );
}
