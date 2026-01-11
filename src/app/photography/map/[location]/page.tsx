import ImageGrid from "@/components/image-grid";
import locations from "@/data/photography/locations.json";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

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
  return <ImageGrid images={images} />;
}
