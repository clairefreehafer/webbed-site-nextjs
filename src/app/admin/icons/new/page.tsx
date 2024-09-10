import { addIcon } from "@actions/icon";
import AdminForm, { FormState } from "@components/admin/form/index";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import { Icon } from "@prisma/client";

export type NewIconState = FormState<Pick<Icon, "character" | "imagePath">>;

const initialState: NewIconState = {};

export default function CreateIconForm() {
  return (
    <AdminForm action={addIcon} initialState={initialState}>
      <TextInput label="emoji" name="character" />

      <TextInput label="image path" name="imagePath" />

      <SubmitButton>add icon</SubmitButton>
    </AdminForm>
  );
}
