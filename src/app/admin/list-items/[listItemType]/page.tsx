import StyledLink from "@components/Link";
import AdminTable, { AdminTableConfig } from "@components/admin/Table";
import { slugName } from "@utils/album";
import { getListItemsByType } from "@utils/prisma/listItem";
import Link from "next/link";
import {
  ListItemType,
  ListItems,
  WebsiteListObject,
  listItemTypes,
} from "types/lists";

export async function generateStaticParams() {
  return listItemTypes.map((listItemType) => ({
    listItemType: slugName(listItemType),
  }));
}

type AdminTableListItemItem = (ListItems & {
  id: number;
})[];

const tableConfig: Record<
  ListItemType,
  AdminTableConfig<AdminTableListItemItem[number]>
> = {
  book: {},
  camera: {},
  music: {},
  podcast: {},
  "video game": {},
  website: {
    website: ({ id, ...listItem }) => (
      <StyledLink href={(listItem as WebsiteListObject).url} target="_blank">
        {(listItem as WebsiteListObject).title}
      </StyledLink>
    ),
    edit: ({ id }) => <Link href={`/admin/list-items/website/${id}`}>✍️</Link>,
  },
};

export default async function Page({
  params: { listItemType },
}: {
  params: { listItemType: ListItemType };
}) {
  const listItems = await getListItemsByType(listItemType);

  return (
    <>
      <p>
        <StyledLink href="/admin/list-items/new">+ add list item</StyledLink>
      </p>
      <AdminTable data={listItems} config={tableConfig[listItemType]} />
    </>
  );
}
