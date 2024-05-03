import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function ReadTags() {
  const tags = await prisma.tag.findMany();
  return (
    <>
      {tags.map((tag) => (
        <>{JSON.stringify(tag)}</>
      ))}
    </>
  )
}