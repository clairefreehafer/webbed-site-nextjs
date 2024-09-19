import { ListFormState, editList } from "@actions/list";
import AdminForm from "@components/admin/form";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import Textarea from "@components/admin/form/Textarea";
import { Prisma } from "@prisma/client";
import { getList } from "@utils/prisma/list";

type Props = {
  listData: Prisma.PromiseReturnType<typeof getList>;
};

export default function UpdateListForm({ listData }: Props) {
  const { id, name, description } = listData;

  const initialState: ListFormState = {
    id,
    name,
    description,
  };

  return (
    <AdminForm action={editList} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <TextInput label="name" name="name" defaultValue={initialState.name} />

      <Textarea
        label="description"
        name="description"
        defaultValue={initialState.description ?? undefined}
      />

      <SubmitButton>update list</SubmitButton>
    </AdminForm>
  );
}
