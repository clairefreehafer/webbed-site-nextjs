import ImageGrid from "@/components/image-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import collectionsJson from "@/data/photography/collections.json";
import { TagConfig } from "@/types/photography";
import { slugify } from "@/utils";
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
  const { collection } = await params;
  const { displayName } = collections[collection];
  return { title: displayName ?? collection };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { collection } = await params;
  const images = await getTagImages(collection);
  const { background, displayName } = collections[collection];
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs
          pathOverride={`/photography/collections/${displayName ?? collection}`}
        />
      </header>
      <ImageGrid images={images} background={background} maxCols={maxCols} />
    </>
  );
}
