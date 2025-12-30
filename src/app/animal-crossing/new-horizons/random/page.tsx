import { Metadata } from "next";
import Link from "next/link";

import { getAlbumImages } from "@/utils/digikam";

import RandomImage from "./random-image";

export const metadata: Metadata = {
  title: "a random photo",
};

export default async function Page() {
  const allImages = await getAlbumImages("", "new-horizons");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100svh",
        padding: "1rem",
      }}
    >
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <Link href="/animal-crossing/new-horizons">new horizons</Link>
        <span>/</span>
        <h2>a random photo</h2>
      </div>

      <RandomImage allImages={allImages} />
    </div>
  );
}
