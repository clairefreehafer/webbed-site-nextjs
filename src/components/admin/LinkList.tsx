import { css } from "@panda/css";
import { displayName } from "@utils/album";
import Link from "next/link";

const linkList = css({
  display: "flex",
  flexWrap: "wrap",
  fontFamily: "pressStart2P",
  gap: "1rem",
  justifyContent: "space-around",
  my: "3rem",
  width: "100%",
});

const span = css({
  opacity: 0,
  _groupHover: {
    opacity: 1,
  },
});

type Props = {
  links: string[] | readonly string[];
};

export default function AdminLinkList({ links }: Props) {
  return (
    <ul className={linkList}>
      {links.map((link) => (
        <li key={link} className="group">
          <span className={span}>▶&nbsp;</span>
          <Link href={`/admin/${link}`}>{displayName(link)}</Link>
        </li>
      ))}
    </ul>
  );
}
