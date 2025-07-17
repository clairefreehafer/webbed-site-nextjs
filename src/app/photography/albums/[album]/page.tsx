import { deslugify, slugify } from "@/utils";
import { getAlbum, getAlbums } from "@/utils/photography/digikam";
import ImageGrid from "@/components/photography/image-grid";

export const dynamicParams = false;

export async function generateStaticParams() {
  const albums = getAlbums();

  return albums.map((album) => ({
    album: slugify(album.relativePath.slice(1)),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const albumSlug = (await params).album;
  const images = getAlbum(deslugify(albumSlug));
  return <ImageGrid images={images} />;
}
