import StyledLink from "@components/Link";
import AdminTable, { AdminTableConfig } from "@components/admin/Table";
import { css } from "@panda/css";
import { prisma } from "@utils/prisma";
import Link from "next/link";

export type AdminTableListItem = {
  /** for using as a key - could replace with slug */
  id: number;
  title: string;
  url?: string;
}[];

const tableConfig: AdminTableConfig<AdminTableListItem[number]> = {
  title: "title",
  edit: ({ id }) => <Link href={`/admin/lists/${id}`}>✍️</Link>,
};

export default async function Page() {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });
  console.log(recipes);

  return (
    <>
      <p
        className={css({
          textAlign: "center",
        })}
      >
        <StyledLink href="/admin/recipes/new">add recipe</StyledLink>
      </p>
      <AdminTable data={recipes} config={tableConfig} />
    </>
  );
}
