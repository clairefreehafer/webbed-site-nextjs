import { slugify } from "@/utils";
import collectionsJson from "@/data/collections.json";
import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";
import { CollectionConfig } from "@/utils/types";

const collections: CollectionConfig = collectionsJson;

export function generateMetadata() {
  return { title: "collections — claire freehafer" };
}

export default async function Page() {
  const links: PhotographyPageLink[] = Object.keys(collections).map(
    (collection) => ({
      display: collections[collection].displayName,
      href: `/collections/${slugify(collection)}`,
    })
  );
  return <LinkList title="collections" links={links} />;
}
