import { getLists } from "@utils/prisma/list";
import Select from "./Select";

export default async function ListSelect() {
  const lists = await getLists();

  const listOptions = lists.map((list) => list.name);

  return <Select label="list" name="list" options={listOptions} />;
}
