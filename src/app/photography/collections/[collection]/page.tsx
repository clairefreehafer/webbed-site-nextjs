import Link from "next/link";

import ImageGrid from "@/components/image-grid";
import collectionsJson from "@/data/photography/collections.json";
import { TagConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const collections: TagConfig = collectionsJson;

type Params = { collection: string };

export function generateStaticParams(): Params[] {
  return Object.keys(collections).map((collection) => {
    const slug = slugify(collection);
    return {
      collection: slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const collection = deslugify((await params).collection);
  const { displayName } = collections[collection];
  return { title: displayName ?? collection };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const collection = deslugify((await params).collection);
  const images = await getTagImages(collection);
  const { background, displayName } = collections[collection];
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <div className="breadcrumbs dotted-border">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/collections">collections</Link>
        <span>/</span>
        <h2>{displayName ?? collection}</h2>
      </div>
      <ImageGrid images={images} background={background} maxCols={maxCols} />
    </>
  );
}
