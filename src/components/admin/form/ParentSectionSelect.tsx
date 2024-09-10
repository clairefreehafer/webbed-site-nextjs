import { Section } from "@prisma/client";
import { getParentSectionOptions } from "@utils/prisma/section";
import Select from "./Select";

export type ParentSectionSelectProps = {
  defaultValue?: Section["parentName"];
};

export default async function ParentSectionSelect({
  defaultValue,
}: ParentSectionSelectProps) {
  const sections = await getParentSectionOptions();

  return (
    <Select
      label="parent section"
      name="parentName"
      defaultValue={defaultValue || "(none)"}
      options={sections}
    />
  );
}
