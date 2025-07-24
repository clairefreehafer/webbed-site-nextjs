import { slugify } from "@/utils";
import collections from "@/data/collections.json";
import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";

export function generateMetadata() {
  return { title: "collections — claire freehafer" };
}

export default async function Page() {
  const links: PhotographyPageLink[] = Object.keys(collections).map(
    (collection) => ({
      display: collections[collection as keyof typeof collections],
      href: `/collections/${slugify(collection)}`,
    })
  );
  return <LinkList title="collections" links={links} />;
}
