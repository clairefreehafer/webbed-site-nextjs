import { TagFormState, addTag } from "@actions/tag";
import AdminForm from "@components/admin/form/index";
import ParentTagSelect from "@components/admin/form/ParentTagSelect";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
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
