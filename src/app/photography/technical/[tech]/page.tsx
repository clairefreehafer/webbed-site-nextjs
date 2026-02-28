import Breadcrumbs from "@/components/photography/breadcrumbs";
import Masonry from "@/components/photography/masonry";
import technicalJson from "@/data/photography/technical.json";
import { TagConfig } from "@/types/photography";
import { deslugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const technicalConfig: Record<string, TagConfig> = technicalJson;

type Params = { tech: string };

export function generateStaticParams(): Params[] {
  return Object.keys(technicalConfig).map((tech) => ({
    tech,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tech } = await params;
  const { displayName } = technicalConfig[tech];
  return { title: displayName ?? deslugify(tech) };
}

// TODO: special one for panoramas
export default async function Page({ params }: { params: Promise<Params> }) {
  const { tech } = await params;
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
      <Masonry
        images={images}
        background={background}
        maxNumberOfColumns={maxCols}
      />
    </>
  );
}
