import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";

export function generateMetadata() {
  return { title: "photography — claire freehafer" };
}

const links: PhotographyPageLink[] = [
  {
    display: "today",
    href: "/today",
  },
  {
    display: "albums",
    href: "/albums",
  },
  {
    display: "collections",
    href: "/collections",
  },
  {
    display: "curated",
  },
  {
    display: "map",
  },
  {
    display: "random",
    href: "/random",
  },
];

export default async function Page() {
  return <LinkList title="photography" links={links} />;
}
