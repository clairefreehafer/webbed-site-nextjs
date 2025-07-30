import ImageGridLinks from "@/components/photography/image-grid-links";
import { getAlbums } from "@/utils/digikam";
import Link from "next/link";

export function generateMetadata() {
  return { title: "albums — claire freehafer" };
}

export default async function Page() {
  const albums = await getAlbums();

  return (
    <>
      <div className="breadcrumbs">
        <Link
          href="/photography"
          style={{ marginBottom: "5px", fontWeight: 300 }}
        >
          photography
        </Link>
        <span style={{ marginBottom: "5px" }}>/</span>
        <h2>albums</h2>
      </div>
      <ImageGridLinks albums={albums} maxCols={3} />
    </>
  );
}
