import { getTagNames } from "@utils/prisma/tag";
import AddTagForm from "./form";
import ParentTagSelect from "@components/admin/parent-tag-select";

export default async function CreateNewTag() {
  const tags = await getTagNames();

  return (
    <AddTagForm>
      <ParentTagSelect tags={tags} />
    </AddTagForm>
  )
}