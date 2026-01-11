import Link from "next/link";

import ImageGrid from "@/components/image-grid";
import technicalJson from "@/data/photography/technical.json";
import { CollectionConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const technicalConfig: CollectionConfig = technicalJson;

type Params = { album: string };

export function generateStaticParams(): Params[] {
  return Object.keys(technicalConfig).map((album) => {
    const slug = slugify(album);
    return {
      album: slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const album = deslugify((await params).album);
  const { displayName } = technicalConfig[album];
  return { title: displayName ?? album };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const album = deslugify((await params).album);
  const images = await getTagImages(album);
  const { background, displayName } = technicalConfig[album];
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <div className="breadcrumbs dotted-border">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/collections">collections</Link>
        <span>/</span>
        <h2>{displayName ?? album}</h2>
      </div>
      <ImageGrid images={images} background={background} maxCols={maxCols} />
    </>
  );
}
