"use client";
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

const ROOT_LINKS = [
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

export default function Nav({ links = ROOT_LINKS }) {
  const pathname = usePathname();
  return (
    <ul>
      {links.map(({ path, title }) => (
        <li className={getActiveNavLink(pathname, path)} key={title}>
          {/* <img webc:if="page.data.linkIcon?.[slugify($data.theme)]" :src="`/images/${slugify($data.theme)}/icons/${page.data.linkIcon[slugify($data.theme)]}.png`" alt="" class="icon"> */}
          <a href={path}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
