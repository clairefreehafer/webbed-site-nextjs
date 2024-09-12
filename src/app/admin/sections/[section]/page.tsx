import { getSection } from "@utils/prisma/section";
import UpdateSectionForm from "./form";
import ParentSectionSelect from "@components/admin/form/ParentSectionSelect";

export default async function Page({
  params,
}: {
  params: { section: string };
}) {
  const sectionData = await getSection(params.section);

  return (
    <UpdateSectionForm
      sectionData={sectionData}
      parentSectionSelect={
        <ParentSectionSelect defaultValue={sectionData.parentName} />
      }
    />
  );
}
