import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";
import { getAlbums } from "@/utils/digikam";

export function generateMetadata() {
  return { title: "albums — claire freehafer" };
}

export default async function Page() {
  const albums = getAlbums();
  const links: PhotographyPageLink[] = albums.map((album) => ({
    display: album.displayName ?? album.relativePath.slice(1),
    href: `/albums/${album.slug}`,
  }));

  return <LinkList title="albums" links={links} />;
}
