import SheikahUnderline from "@/components/zelda/sheikah-underline";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <Image
        src="/images/zelda/pad-line-1.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />

      <div className="game-links">
        <SheikahUnderline
          text="tears of the kingdom"
          textSize="0.9rem"
          gap="0.1rem"
        >
          <Link href="/zelda/tears-of-the-kingdom">
            <h2>tears of the kingdom</h2>
          </Link>
        </SheikahUnderline>

        <SheikahUnderline
          text="breath of the wild"
          textSize="0.9rem"
          gap="0.1rem"
        >
          <h2>
            <Link href="/zelda/breath-of-the-wild">breath of the wild</Link>
          </h2>
        </SheikahUnderline>
      </div>

      <Image
        src="/images/zelda/pad-line-3.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
    </div>
  );
}
