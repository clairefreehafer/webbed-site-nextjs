"use client";

import { editSection } from "@actions/section";
import AdminForm, { AdminFormState } from "@components/admin/form/index";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import { Prisma } from "@prisma/client";
import { getSection } from "@utils/prisma/section";
import { ReactNode } from "react";

type Props = {
  sectionData: Prisma.PromiseReturnType<typeof getSection>;
  parentSectionSelect: ReactNode;
};

export type UpdateSectionFormState = AdminFormState<Props["sectionData"]>;

export default function UpdateSectionForm({
  sectionData,
  parentSectionSelect,
}: Props) {
  const { id, name, parentName } = sectionData;

  const initialState: UpdateSectionFormState = {
    id,
    name,
    parentName,
  };

  return (
    <AdminForm action={editSection} initialState={initialState}>
      <input type="hidden" name="id" value={id} />

      <TextInput label="name" name="name" defaultValue={initialState.name} />

      {parentSectionSelect}

      <SubmitButton>update section</SubmitButton>
    </AdminForm>
  );
}
