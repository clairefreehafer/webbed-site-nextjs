import IconList from "@components/icon-list";

// for future reference
const newHorizonsSections = [
  "residents",
  "visitors",
  "events", // "dreams",
  // "landscapes", "interiors",
  // "misc", "random",
  // "new", "all"
];

function Section({ section }: { section: string }) {
  return (
    <div>
      <h4 className="text-center">{section}</h4>
      <IconList section={section} theme="animalCrossing" />
    </div>
  );
}

export default async function AnimalCrossing() {
  return (
    <div className="grid grid-cols-2">
      <h3 className="col-span-2 text-center">new horizons</h3>

      {newHorizonsSections.map((section) => (
        <Section section={section} key={section} />
      ))}
    </div>
  );
}
