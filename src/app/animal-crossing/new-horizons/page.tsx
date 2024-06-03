import { getChildSections } from "@utils/prisma/section";
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
  const sections = await getChildSections("new-horizons");

  return (
    <div className="flex flex-col items-center">
      <h3>new horizons</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.name}>
            <Link href={`/animal-crossing/new-horizons/${section.name}`}>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
