import "@/sass/photography/link-list.scss";

import Link from "next/link";

export type PhotographyPageLink = {
  href?: string;
  display: string;
  description?: string;
};

export default function LinkList({ links }: { links: PhotographyPageLink[] }) {
  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.display} className="link-list-item">
          {link.href ? (
            <Link href={`/photography${link.href}`}>{link.display}</Link>
          ) : (
            <s>{link.display}</s>
          )}
          {link.description && (
            <p className="link-description">{link.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
