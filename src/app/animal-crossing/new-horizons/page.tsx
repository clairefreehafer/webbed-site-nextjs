import Link from "next/link";

// TODO: add to db?
export const newHorizonsSections = [
  "residents", "visitors",
  "events", "dreams",
  "landscapes", "interiors",
  "misc", "random",
  "new", "all"
];

export default function NewHorizonsPage() {
  return (
    <ul className="grid">
      {newHorizonsSections.map((section) => (
        <li key={section}>
          <Link href={`/animal-crossing/new-horizons/${section}`}>
            {section}
          </Link>
        </li>
      ))}
    </ul>
  )
}