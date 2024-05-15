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
      section: section.split(","),
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
  const generateDateAutomatically = formData.get("generateDateAutomatically");

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
