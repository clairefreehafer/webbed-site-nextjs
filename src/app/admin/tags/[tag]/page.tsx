import ParentTagSelect from "@components/admin/form/ParentTagSelect";
import TagForm from "./form";
import { displayName } from "@utils/album";
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
