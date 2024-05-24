import ParentTagSelect from "@components/admin/parent-tag-select";
import TagForm from "./form";
import { displayName } from "@utils/albums";
import { getTag } from "@utils/prisma";
import { getTagNames } from "@utils/prisma/tag";

export default async function Tag(
  { params }:
  { params: { tag: string } }
) {
  const tagData = await getTag(displayName(params.tag));
  const tags = await getTagNames();

  if (!tagData) {
    return "❌ no tag data available.";
  }

  return (
    <TagForm tagData={tagData}>
      <ParentTagSelect tags={tags} defaultValue={tagData.parentName} />
    </TagForm>
  );
}