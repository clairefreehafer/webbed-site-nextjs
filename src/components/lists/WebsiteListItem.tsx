import StyledLink from "@components/Link";
import { css } from "@panda/css";
import { WebsiteListObject } from "types/lists";

const listItem = css({
  listStylePosition: "inside",
  listStyleType: "disc",
});

export default function WebsiteListItem({ title, url }: WebsiteListObject) {
  return (
    <li key={title} className={listItem}>
      <StyledLink href={url}>{title}</StyledLink>
    </li>
  );
}
