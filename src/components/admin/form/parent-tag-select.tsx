import { Tag } from "@prisma/client";
import { getParentTagOptions } from "@utils/prisma/tag";
import Select from "./select";

type ParentTagSelectProps = {
  defaultValue?: Tag["parentName"];
};

export default async function ParentTagSelect({
  defaultValue,
}: ParentTagSelectProps) {
  const tagOptions = await getParentTagOptions();

  return (
    <Select
      label="parent tag"
      name="parentName"
      options={tagOptions}
      defaultValue={defaultValue || "(none)"}
    />
  );
}
