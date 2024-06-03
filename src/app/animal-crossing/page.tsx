import Link from "next/link";

export default function AnimalCrossing() {
  return (
    <div className="flex w-full flex-col justify-center text-center">
      <h3>browse by game</h3>
      <ul>
        <li>
          <Link href="/animal-crossing/new-horizons">new horizons</Link>
        </li>
      </ul>
    </div>
  );
}
