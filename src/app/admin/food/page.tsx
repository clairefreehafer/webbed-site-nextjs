import StyledLink from "@components/Link";
import AdminTable, { AdminTableConfig } from "@components/admin/Table";
import { css } from "@panda/css";
import { FoodCategory } from "types/recipes";
import { findManyFood } from "@utils/prisma/food";

export type AdminTableListItem = {
  name: string;
  category: FoodCategory;
}[];

const tableConfig: AdminTableConfig<AdminTableListItem[number]> = {
  name: "name",
  category: "category",
  // edit: ({ slug }) => <Link href={`/admin/lists/${slug}`}>✍️</Link>,
};

export default async function Page() {
  const food = await findManyFood({ orderBy: { name: "asc" } });

  return (
    <>
      <p
        className={css({
          textAlign: "center",
        })}
      >
        <StyledLink href="/admin/food/new">add food</StyledLink>
      </p>
      <AdminTable data={food} config={tableConfig} />
    </>
  );
}
