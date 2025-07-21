import { slugify } from "@/utils";
import TAGS from "./[collection]/tags";
import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";

export function generateMetadata() {
  return { title: "collections — claire freehafer" };
}

export default async function Page() {
  const links: PhotographyPageLink[] = TAGS.map((tag) => ({
    display: tag,
    href: `/collections/${slugify(tag)}`,
  }));
  return <LinkList title="collections" links={links} />;
}
