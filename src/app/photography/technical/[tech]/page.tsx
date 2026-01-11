import ImageGrid from "@/components/image-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import technicalJson from "@/data/photography/technical.json";
import { TagConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const technicalConfig: TagConfig = technicalJson;

type Params = { tech: string };

export function generateStaticParams(): Params[] {
  return Object.keys(technicalConfig).map((album) => {
    const slug = slugify(album);
    return {
      tech: slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const album = deslugify((await params).tech);
  const { displayName } = technicalConfig[album];
  return { title: displayName ?? album };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const tech = deslugify((await params).tech);
  const images = await getTagImages(tech);
  const { background, displayName } = technicalConfig[tech];
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs
          pathOverride={`/photography/technical/${
            displayName ?? deslugify(tech)
          }`}
        />
      </header>
      <ImageGrid images={images} background={background} maxCols={maxCols} />
    </>
  );
}
