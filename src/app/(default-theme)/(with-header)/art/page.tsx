import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "art",
};

export default function Page() {
  return (
    <section className="content">
      <h3>📸 photography</h3>
      <p>
        the <Link href="/photography">photography section</Link> of this site is
        functional but still a work in progress. for a more robust collection of
        my photography, you can also checkout my{" "}
        <a href="https://clairefreehafer.smugmug.com" target="_blank">
          smugmug
        </a>{" "}
        or{" "}
        <a href="https://flickr.com/clairefreehafer" target="_blank">
          flickr
        </a>
        .
      </p>

      <h3>🎮 video games</h3>
      <p>
        view virtual photography and other work inspired by and created with my
        favorite video games.
      </p>
      <ul>
        <li>
          <Link href="/animal-crossing">animal crossing</Link>
        </li>
        <li>
          <Link href="/bioshock">bioshock</Link>
        </li>
        <li>
          <Link href="/firewatch">firewatch</Link>
        </li>
        <li>
          <Link href="/grand-theft-auto-v">grand theft auto V</Link>
        </li>
        <li>
          <Link href="/the-witness">the witness</Link>
        </li>
        <li>
          <Link href="/uncharted-4">uncharted 4</Link>
        </li>
        <li>
          <Link href="/zelda">zelda</Link>
        </li>
      </ul>

      <h3>💻 digital art</h3>
      <ul>
        <li>
          <Link href="/glitch">glitch art</Link>
        </li>
      </ul>
    </section>
  );
}
