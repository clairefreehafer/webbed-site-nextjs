import Link from "next/link";

export type PhotographyPageLink = {
  href?: string;
  display: string;
};

export default async function LinkList({
  title,
  links,
}: {
  title: string;
  links: PhotographyPageLink[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <h2>{title}</h2>
      <nav className="nav">
        <ul>
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
      </nav>
    </div>
  );
}
