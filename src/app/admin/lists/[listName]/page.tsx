import { displayName } from "@utils/album";
import { getList } from "@utils/prisma/list";
import UpdateListForm from "./form";

export default async function Page({
  params,
}: {
  params: { listName: string };
}) {
  const list = await getList(displayName(params.listName));
  return <UpdateListForm listData={list} />;
}
