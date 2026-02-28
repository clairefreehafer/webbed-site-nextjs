import Breadcrumbs from "@/components/photography/breadcrumbs";
import Masonry from "@/components/photography/masonry";
import locationsJson from "@/data/photography/locations.json";
import { LocationConfig } from "@/types/photography";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

const locations: Record<string, LocationConfig> = locationsJson;

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
  const { location } = await params;

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
  const images = await getTagImages(location);
  const maxCols =
    images.length === 1 || images.length === 2 ? images.length : 3;

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs
          pathOverride={`/photography/map/${
            locations[location]?.name ?? deslugify(location)
          }`}
        />
      </header>

      <div style={{ padding: "1rem" }}>
        <Masonry images={images} maxNumberOfColumns={maxCols} />
      </div>
    </>
  );
}
