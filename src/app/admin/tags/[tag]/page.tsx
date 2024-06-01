import ParentTagSelect from "@components/admin/form/parent-tag-select";
import TagForm from "./form";
import { displayName } from "@utils/albums";
import { getTag } from "@utils/prisma/tag";

export default async function Tag({ params }: { params: { tag: string } }) {
  const tagData = await getTag(displayName(params.tag));

  return (
    <TagForm
      tagData={tagData}
      parentTagSelect={<ParentTagSelect defaultValue={tagData.parentName} />}
    />
  );
}
