import ImageGrid from "@/components/photography/image-grid";
import locations from "@/data/locations.json";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";

export function generateStaticParams() {
  return Object.keys(locations).map((location) => ({
    location: slugify(location),
  }));
}

type Params = {
  params: Promise<{ location: string }>;
};

export async function generateMetadata({ params }: Params) {
  const location = deslugify((await params).location) as keyof typeof locations;
  return {
    title: `${locations[location].name} — claire freehafer`,
  };
}

export default async function Page({ params }: Params) {
  const { location } = await params;
  const images = await getTagImages(deslugify(location));
  return <ImageGrid images={images} />;
}
