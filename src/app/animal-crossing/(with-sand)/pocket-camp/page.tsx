import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <h2>pocket camp</h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "2rem",
          width: "100%",
        }}
      >
        <Link href="/animal-crossing/pocket-camp/photo-album">
          <Image
            src="/images/animal-crossing/pocket-camp/journals/stickers.png"
            className="planner"
            alt="photo album"
            width={508}
            height={854}
            style={{
              "--rotate": `${Math.random() * 10 - 5}deg`,
            }}
          />
        </Link>

        <Link href="/animal-crossing/pocket-camp/schedule">
          <Image
            src="/images/animal-crossing/pocket-camp/journals/night-sky.png"
            className="planner"
            alt="schedule"
            width={508}
            height={854}
            style={{
              "--rotate": `${Math.random() * 10 - 5}deg`,
            }}
          />
        </Link>
      </div>
    </>
  );
}
