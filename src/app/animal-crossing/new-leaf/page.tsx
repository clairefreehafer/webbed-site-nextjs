import { Metadata } from "next";
import Link from "next/link";

import Slideshow from "@/components/slideshow";
import { Grass } from "@/utils/animal-crossing/grass";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "animal crossing new leaf",
};

export default async function Page() {
  const images = await getAlbumImages("new-leaf", "animal-crossing");

  return (
    <>
      <Grass shape="triangle" date={new Date()} />
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/animal-crossing">animal crossing</Link>
          <span>/</span>
          <h2>new leaf</h2>
        </div>
      </div>
      <Slideshow images={images} album={undefined} />
    </>
  );
}
