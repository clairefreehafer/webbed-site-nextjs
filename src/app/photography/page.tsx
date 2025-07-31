import LinkList, {
  PhotographyPageLink,
} from "@/components/photography/link-list";
import { Metadata } from "next";

export const metadata: Metadata = { title: "photography — claire freehafer" };

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
    href: "/map",
  },
  {
    display: "random",
    href: "/random",
  },
];

export default async function Page() {
  return (
    <>
      <h2>photography</h2>
      <LinkList links={links} />
    </>
  );
}
