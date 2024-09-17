import IconList from "@components/IconList";
import { css } from "@panda/css";
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

const container = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
});

const h3 = css({
  filter: "drop-shadow({shadows.text})",
  fontSize: "1.5rem",
  gridColumn: "span 2",
  textAlign: "center",
});

const h4 = css({
  borderBottom: "4px dashed {colors.brown}",
  filter: "drop-shadow({shadows.text})",
  fontSize: "1.25rem",
  m: "1rem 0",
  pb: "0.5rem",
  textAlign: "center",
});

async function Section({ section }: { section: string }) {
  const albums = await getIconListAlbums(section);

  return (
    <div>
      <h4 className={h4}>{section}</h4>
      <IconList albums={albums} theme="animalCrossing" />
    </div>
  );
}

export default async function AnimalCrossing() {
  return (
    <div className={container}>
      <h3 className={h3}>new horizons</h3>

      {newHorizonsSections.map((section) => (
        <Section section={section} key={section} />
      ))}
    </div>
  );
}
