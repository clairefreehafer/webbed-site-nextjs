import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import Breadcrumbs from "@/components/photography/breadcrumbs";
import Masonry from "@/components/photography/masonry";
import collectionsJson from "@/data/photography/collections.json";
import { TagConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const collections: Record<string, TagConfig> = collectionsJson;

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
  const { collection } = await params;
  const { displayName } = collections[collection];
  return { title: displayName ?? collection };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { collection } = await params;
  const images = await getTagImages(collection);
  const { background, displayName, relatedTags } = collections[collection];
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs
          pathOverride={`/photography/collections/${displayName ?? collection}`}
        />
      </header>

      <main style={{ padding: "1rem" }}>
        {relatedTags && (
          <p className="page-description">
            see also:
            <br />
            {relatedTags.map((tag, idx) => (
              <Fragment key={tag}>
                {idx !== 0 && " | "}
                <Link href={`/photography/collections/${tag}`}>
                  {collections[tag].displayName ?? deslugify(tag)}
                </Link>
              </Fragment>
            ))}
          </p>
        )}

        <Masonry
          images={images}
          background={background}
          maxNumberOfColumns={maxCols}
        />
      </main>
    </>
  );
}
