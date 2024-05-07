import AdminForm, { Input, Label } from "@components/admin/form";
import { updateTag } from "@actions/tag";
import { Tag } from "@prisma/client";
import { ParentTagSelect } from "@components/admin/parent-tag-select";

export default async function TagForm(
  { tagData }: { tagData: Tag }
) {
  const initialState = tagData;

  return (
    <AdminForm action={updateTag} initialState={initialState}>
      <Label>
        tag
        <Input type="text" name="tag" defaultValue={tagData.tag} />
      </Label>
      
      <ParentTagSelect defaultValue={tagData.parent as string} />

      <button type="submit">update tag</button>
    </AdminForm>
  );
}