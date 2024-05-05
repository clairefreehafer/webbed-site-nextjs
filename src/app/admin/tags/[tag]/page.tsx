import { PrismaClient } from "@prisma/client";
import TagForm from "./form";
import { displayName } from "@utils/albums";

const prisma = new PrismaClient();

export default async function Tag(
  { params }:
  { params: { tag: string } }
) {
  const tagData = await prisma.tag.findUnique({
    where: { tag: displayName(params.tag) }
  });

  if (!tagData) {
    return "❌ no tag data available";
  }

  return (
    <TagForm tagData={tagData} />
  );
}