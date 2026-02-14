import { Metadata } from "next";
import Link from "next/link";

import Slideshow from "@/components/slideshow";
import { Grass } from "@/utils/animal-crossing/grass";
import { getAlbumImages } from "@/utils/digikam";

export const metadata: Metadata = {
  title: "animal crossing pocket camp",
};

export default async function Page() {
  const images = await getAlbumImages("pocket-camp", "animal-crossing");

  return (
    <>
      <Grass shape="circle" date={new Date()} />
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/animal-crossing">animal crossing</Link>
          <span>/</span>
          <Link href="/animal-crossing/pocket-camp">pocket camp</Link>
          <span>/</span>
          <h2>photo album</h2>
        </div>
      </div>

      <Slideshow images={images} />
    </>
  );
}
