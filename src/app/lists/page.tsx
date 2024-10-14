import { slugName } from "@utils/album";
import { css } from "@panda/css";
import StyledLink from "@components/Link";
import { findManyLists } from "@utils/prisma/list";

export default async function Page() {
  const lists = await findManyLists({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  if (!lists) return <>no lists :(</>;

  return (
    <>
      <p>i like to make lists. :)</p>
      <ul
        className={css({
          listStyle: "disc inside",
        })}
      >
        {lists.map((list) => (
          <li key={list.id}>
            <StyledLink href={`/lists/${slugName(list.name)}`}>
              {list.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </>
  );
}
