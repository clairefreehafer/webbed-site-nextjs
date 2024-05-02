"use server";

import { PrismaClient } from "@prisma/client";
import { AddAlbumFormState } from "./types";

const prisma = new PrismaClient();

export async function createAlbum(_prevState: AddAlbumFormState, formData: FormData) {
  const album = formData.get("album") as string;
  const section = formData.get("section") as string;

  try {
    const existingAlbum = await prisma.album.findUnique({
      where: { name: album }
    });

    if (existingAlbum) {
      throw new Error(`an album called "${album}" already exists.`);
    }

    await prisma.album.create({ data: {
      name: album,
      section,
    } });

    return {
      name: album,
      message: `👍 album ${album} added`
    }
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      name: album,
      message: `👎 ${(error as Error).message}`
    };
  }
}
