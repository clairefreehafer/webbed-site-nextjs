import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <h2>pocket camp</h2>
      </div>
      <Link href="/animal-crossing/pocket-camp/photo-album">
        <img
          src="/images/animal-crossing/journals/stickers.png"
          className="planner"
        />
      </Link>
    </>
  );
}
