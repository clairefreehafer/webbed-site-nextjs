import AdminForm, { AdminFormState } from "@components/admin/form/index";
import { editTag } from "@actions/tag";
import { Prisma } from "@prisma/client";
import { ReactNode } from "react";
import SubmitButton from "@components/admin/form/SubmitButton";
import { getTag } from "@utils/prisma/tag";
import TextInput from "@components/admin/form/TextInput";

type Props = {
  tagData: Prisma.PromiseReturnType<typeof getTag>;
  parentTagSelect: ReactNode;
};

export type UpdateTagFormState = AdminFormState<
  Prisma.PromiseReturnType<typeof getTag>
>;

export default async function TagForm({ tagData, parentTagSelect }: Props) {
  const initialState = tagData as UpdateTagFormState;

  return (
    <AdminForm action={editTag} initialState={initialState}>
      <input type="hidden" name="id" value={initialState.id} />

      <TextInput
        label="name"
        name="name"
        defaultValue={initialState.name}
        required
      />

      {parentTagSelect}

      <SubmitButton>update tag</SubmitButton>
    </AdminForm>
  );
}
