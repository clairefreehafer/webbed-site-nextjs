import { slugName } from "@utils/album";
import { css } from "@panda/css";
import StyledLink from "@components/Link";
import { getLists } from "@utils/prisma/list";

export default async function Page() {
  const lists = await getLists();

  return (
    <>
      <p>i like to make lists. :)</p>
      <ul
        className={css({
          listStyle: "disc inside",
        })}
      >
        {lists.map((listItem, idx) => (
          <li key={idx}>
            <StyledLink href={`/lists/${slugName(listItem.name)}`} theme="book">
              {listItem.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </>
  );
}
