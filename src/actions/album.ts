"use server";

import { Album, PrismaClient } from "@prisma/client";
import { AlbumTypes } from "@utils/albums";

export type AlbumFormState = Album & { message?: string };

const prisma = new PrismaClient();

export async function createAlbum(
  _prevState: Partial<AlbumFormState>,
  formData: FormData
) {
  const album = formData.get("album") as string;
  const section = formData.get("section") as string;
  const type = formData.get("type") as AlbumTypes;

  try {
    const existingAlbum = await prisma.album.findUnique({
      where: { name: album }
    });

    if (existingAlbum) {
      throw new Error(`an album called "${album}" already exists.`);
    }

    const createdAlbum = await prisma.album.create({ data: {
      name: album,
      section: section.split(","),
      type,
    } });

    return {
      ...createdAlbum,
      message: `👍 ${type} album ${album} added in ${section}`
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
  const generateDateAutomatically = formData.get("generateDateAutomatically");
  const coverKey = formData.get("coverKey") as string;

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

      const { captureDate } = photosInAlbum[0];

      console.log(`👉 changing date automatically from ${prevState.date} to ${captureDate}...`);
      data.date = captureDate;
    } else if (date) {
      console.log(`👉 changing date manually from ${prevState.date} to ${date}...`);
      data.date = new Date(date);
    }

    if (prevState.name !== name) {
      console.log(`👉 changing name from ${prevState.name} to ${name}...`);
      data.name = name;
    }

    const sectionFromDropdowns = [];
    let currentValue = formData.get("section0") as string;
    let currentIndex = 0;

    while (currentValue) {
      sectionFromDropdowns.push(currentValue);
      currentIndex++;
      currentValue = formData.get(`section${currentIndex}`) as string;
    }

    if (prevState.section?.join(",") !== section) {
      console.log(`👉 changing section from ${prevState.section} to new section ${section}...`);
      data.section = section.split(",");
    } else if (sectionFromDropdowns.join(",") !== section) {
      console.log(`👉 changing section from ${prevState.section} to existing section ${sectionFromDropdowns}...`);
      data.section = sectionFromDropdowns;
    }

    if (prevState.coverKey !== coverKey) {
      console.log(`👉 changing coverKey from ${prevState.coverKey} to ${coverKey}...`);
      data.coverKey = coverKey;
    }

    const updatedAlbum = await prisma.album.update({
      where: { name },
      data,
    });

    return {
      ...updatedAlbum,
      message: `👍 ${name} updated successfully`
    }
  } catch (error) {
    console.error(`👎 ${(error as Error).message}`);
    return {
      ...prevState,
      ...data,
      message: `👎 ${(error as Error).message}`
    }
  }
}

export async function deleteAlbum(formData: FormData) {
  const id = parseInt(formData.get("value") as string);
  console.log(formData)

  try {
    const deletedAlbum = await prisma.album.delete({
      where: { id }
    });

    return {
      ...deletedAlbum,
      message: `👍 album deleted successfully.`
    }
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      message: `👎 ${(error as Error).message}`
    }
  }
}
