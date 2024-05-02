import Link from "next/link";

export default function AnimalCrossing() {
  return (
    <>
      <h3>browse by game</h3>
      <ul>
        <li><Link href="/animal-crossing/new-horizons">new horizons</Link></li>
      </ul>

      <h3>browse by character</h3>
      
      <h3>random</h3>

      <h3>recently added</h3>
    </>
  )
}