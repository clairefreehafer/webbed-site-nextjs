import { editIcon } from "@actions/icon";
import AdminForm, { AdminFormState } from "@components/admin/form";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import Textarea from "@components/admin/form/Textarea";
import { Prisma } from "@prisma/client";
import { getIconData } from "@utils/prisma/icon";

export type UpdateIconFormState = AdminFormState<
  Prisma.PromiseReturnType<typeof getIconData>
>;

type Props = {
  iconData: Prisma.PromiseReturnType<typeof getIconData>;
};

export default function UpdateIconForm({ iconData }: Props) {
  const { id, imagePath, character, text } = iconData;

  const initialState: UpdateIconFormState = {
    ...iconData,
    message: "",
  };

  return (
    <AdminForm action={editIcon} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} />

      {character && (
        <TextInput label="emoji" name="character" defaultValue={character} />
      )}

      {imagePath && (
        <TextInput
          label="image path"
          name="imagePath"
          defaultValue={imagePath}
        />
      )}

      <Textarea label="text" name="text" defaultValue={text || ""} />

      <SubmitButton>update icon</SubmitButton>
    </AdminForm>
  );
}
