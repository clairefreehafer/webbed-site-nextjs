"use server";

import { Album, PrismaClient } from "@prisma/client";

export type AlbumFormState = Album & { message?: string };

const prisma = new PrismaClient();

export async function createAlbum(
  _prevState: Partial<AlbumFormState>,
  formData: FormData
) {
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

export async function updateAlbum(
  prevState: Partial<AlbumFormState>,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const section = formData.get("section") as string;
  const date = formData.get("date") as string;
  const generateDateAutomatically = Boolean(formData.get("generateDateAutomatically"));

  let data: Partial<Album> = {};

  try {
    if (generateDateAutomatically) {
      const photosInAlbum = await prisma.photo.findMany({
        where: { albumName: name },
        orderBy: { captureDate: { sort: "desc" }}
      });

      if (!photosInAlbum?.length) {
        throw new Error(`no photos in ${name} to generate date.`);
      }

      data.date = photosInAlbum[0].captureDate;
    } else if (date) {
      data.date = new Date(date);
    }

    if (prevState.name !== name) {
      console.log(`👉 changing name from ${prevState.name} to ${name}...`);
      data.name = name;
    }
    if (prevState.section !== section) {
      console.log(`👉 changing section from ${prevState.section} to ${section}...`);
      data.section = section;
    }

    await prisma.album.update({
      where: { name },
      data,
    });

    return {
      ...data,
      message: `👍 ${name} updated successfully`
    }
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      message: `👎 ${(error as Error).message}`
    }
  }
}
