import Breadcrumbs from "@/components/photography/breadcrumbs";
import Slideshow from "@/components/slideshow";
import { deslugify } from "@/utils";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

type Params = { album: string };

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => {
    return {
      album: album.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const albumSlug = (await params).album;
  return { title: deslugify(albumSlug) };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const albumSlug = (await params).album;
  const images = await getAlbumImages(albumSlug);

  return (
    <>
      <header id="photography-header">
        <Breadcrumbs />
        <p className="right-element">{images.length} images</p>
      </header>
      <Slideshow images={images} />
    </>
  );
}
