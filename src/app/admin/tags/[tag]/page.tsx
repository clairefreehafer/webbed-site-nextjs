import TagForm from "./form";
import { displayName } from "@utils/albums";
import { getTag } from "@utils/prisma";

export default async function Tag(
  { params }:
  { params: { tag: string } }
) {
  const tagData = await getTag(displayName(params.tag));

  if (!tagData || typeof tagData === "string") {
    return `❌ no tag data available. ${tagData && tagData}`;
  }

  return (
    <TagForm tagData={tagData} />
  );
}