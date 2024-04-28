"use server";

import { PrismaClient } from "@prisma/client";
import { AddAlbumFormState } from "./types";

export async function createAlbum(_prevState: AddAlbumFormState, formData: FormData) {
  const album = formData.get("album") as string;

  try {
    const prisma = new PrismaClient();

    const existingAlbum = await prisma.album.findUnique({
      where: { name: album }
    });

    if (existingAlbum) {
      throw new Error(`an album called "${album}" already exists.`);
    }

    await prisma.album.create({ data: { name: album } });

    return {
      name: album,
      message: "👍 album added"
    }
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      name: album,
      message: `👎 ${(error as Error).message}`
    };
  }
}

export async function getAlbums() {
  try {
    const prisma = new PrismaClient();

    const albums = await prisma.album.findMany({
      include: { photos: true },
      orderBy: { date: { sort: "desc", nulls: "first" } }
    });

    return albums;
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return `👎 ${(error as Error).message}`;
  }
}