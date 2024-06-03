import { TagFormState, addTag } from "@actions/tag";
import AdminForm from "@components/admin/form/index";
import ParentTagSelect from "@components/admin/form/parent-tag-select";
import SubmitButton from "@components/admin/form/submit-button";
import TextInput from "@components/admin/form/text-input";
import { Prisma } from "@prisma/client";

const initialState: Partial<TagFormState<Prisma.TagCreateArgs["data"]>> = {};

export default function AddTagForm() {
  return (
    <AdminForm action={addTag} initialState={initialState}>
      <TextInput label="name" name="name" required />

      <ParentTagSelect />

      <SubmitButton>create tag</SubmitButton>
    </AdminForm>
  );
}
