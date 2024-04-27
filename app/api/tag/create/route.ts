import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
 
export async function POST(request: Request) {
  try {
    const { tag } = await request.json();

    if (!tag) {
      throw new Error("Must include `tag` property in POST body.");
    }

    const existingTag = await prisma.tag.findUnique({
      where: { tag }
    });

    if (existingTag) {
      throw new Error(`Tag "${tag}" already exists.`);
    }

    await prisma.tag.create({ data: { tag }});

    return NextResponse.json({ result: `Tag "${tag}" successfully created.` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
