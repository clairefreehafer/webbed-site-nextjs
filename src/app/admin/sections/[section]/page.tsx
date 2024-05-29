import { getParentSections, getSection } from "@utils/prisma/section";
import UpdateSectionForm from "./form";

export default async function Page(
  { params }: { params: { section: string }}
) {
  const sectionData = await getSection(params.section);
  const sections = await getParentSections();

  return (
    <UpdateSectionForm sectionData={sectionData} sections={sections} />
  );
}