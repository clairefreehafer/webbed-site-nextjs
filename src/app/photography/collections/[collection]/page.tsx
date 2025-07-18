import ImageGrid from "@/components/photography/image-grid";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/photography/digikam";

export const TAGS = [
  "black and white",
  "fisheye",
  // birds
  // long exposure
] as const;

export async function generateStaticParams() {
  return TAGS.map((tag) => ({ collection: slugify(tag) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = deslugify((await params).collection);
  const images = getTagImages(collection);
  return <ImageGrid images={images} />;
}
