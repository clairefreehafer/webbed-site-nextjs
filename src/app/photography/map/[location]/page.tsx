import ImageGrid from "@/components/image-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import locationsJson from "@/data/photography/locations.json";
import { LocationConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const locations = locationsJson as unknown as LocationConfig;

type Params = { location: string };

export function generateStaticParams(): Params[] {
  return Object.keys(locations).map((location) => ({
    location: slugify(location),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const location = deslugify((await params).location) as keyof typeof locations;

  return {
    title: locations[location].name,
  };
}

// use https://www.openstreetmap.org or https://overpass-turbo.eu/# with query:
// ```
//   node["name"="${name}"];
//   out;
// ```
// for getting locations.json coordinates

export default async function Page({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const images = await getTagImages(deslugify(location));

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs
          pathOverride={`/photography/map/${
            locations[location]?.name ?? deslugify(location)
          }`}
        />
      </header>

      <ImageGrid images={images} />
    </>
  );
}
