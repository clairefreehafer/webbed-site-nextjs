import { getSectionsArr } from "@utils/albums";
import Link from "next/link";

// for future reference
// const newHorizonsSections = [
//   "residents", "visitors",
//   "events", "dreams",
//   "landscapes", "interiors",
//   "misc", "random",
//   "new", "all"
// ];

export default async function NewHorizonsPage() {
  const sections = await getSectionsArr("new-horizons");
  
  return (
    <ul className="grid">
      {sections.map((section) => (
        <li key={section[section.length - 1]}>
          <Link href={`/animal-crossing/new-horizons/${section[section.length - 1]}`}>
            {section[section.length - 1]}
          </Link>
        </li>
      ))}
    </ul>
  )
}