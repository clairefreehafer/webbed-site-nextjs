import { ROOT_LINKS } from "@/utils/constants";
import Link from "next/link";
import "@/sass/photography/nav.scss";

export default function Nav() {
  return (
    <nav>
      <ul>
        {ROOT_LINKS.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
