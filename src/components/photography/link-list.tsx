import Link from "next/link";
import "@/sass/photography/link-list.scss";

export type PhotographyPageLink = {
  href?: string;
  display: string;
};

export default async function LinkList({
  links,
}: {
  links: PhotographyPageLink[];
}) {
  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.display}>
          {link.href ? (
            <Link href={`/photography${link.href}`}>{link.display}</Link>
          ) : (
            <s>{link.display}</s>
          )}
        </li>
      ))}
    </ul>
  );
}
