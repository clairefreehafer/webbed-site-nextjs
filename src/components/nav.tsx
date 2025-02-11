"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

function getActiveNavLink(currentUrl: string, pageUrl: string) {
  const currentSection = currentUrl.split("/")[1];

  if (pageUrl === "/" && !currentSection) {
    return "active";
  }

  if (currentSection === pageUrl.replace("/", "")) {
    return "active";
  }
  return "";
}

type LinkProps = {
  title: string;
  path: string;
  icon?: string;
};

export const ROOT_LINKS: LinkProps[] = [
  {
    title: "home",
    path: "/",
  },
  {
    title: "art",
    path: "/art",
  },
  {
    title: "recipes",
    path: "/recipes",
  },
  {
    title: "lists",
    path: "/lists",
  },
];

export default function Nav({ links = ROOT_LINKS }: { links?: LinkProps[] }) {
  const pathname = usePathname();
  return (
    <ul>
      {links.map(({ path, title, icon }) => (
        <li className={getActiveNavLink(pathname, path)} key={title}>
          {icon ? (
            <Image
              src={`/images/${icon}.png`}
              alt=""
              className="icon"
              height={48}
              width={48}
            />
          ) : null}
          <a href={path}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
