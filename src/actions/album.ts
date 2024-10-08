"use server";

import { UpdateAlbumFormState } from "@app/admin/albums/[album]/form";
import { Album, Prisma, PrismaClient } from "@prisma/client";
import { AlbumTypes } from "@utils/album";
import { getMostRecentPhotoDate } from "@utils/prisma/photo";
import { createAlbum, updateAlbum } from "@utils/prisma/album";
import { revalidatePath } from "next/cache";
import { AdminFormState } from "@components/admin/form";

export type AlbumFormState = AdminFormState<Album>;

const prisma = new PrismaClient();

export async function addAlbum(_prevState: AlbumFormState, formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as AlbumTypes;

  try {
    let sectionName = "";
    let currentValue = formData.get("section0") as string;
    let currentIndex = 0;

    while (currentValue) {
      sectionName = currentValue;
      currentIndex++;
      currentValue = formData.get(`section${currentIndex}`) as string;
    }

    const createdAlbum = await createAlbum({
      data: {
        name,
        sectionName,
        type,
      },
    });

    return {
      ...createdAlbum,
      message: `👍 ${type} album ${name} added in ${sectionName}`,
    };
  } catch (error) {
    let message = `👎 ${(error as Error).message}`;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        message = `👎 an album called "${name}" already exists.`;
      }
    }

    return { message };
  }
}

export async function editAlbum(
  prevState: UpdateAlbumFormState,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const generateDateAutomatically = formData.get("generateDateAutomatically");
  const coverKey = formData.get("coverKey") as string;
  const iconId = parseInt(formData.get("iconId") as string);

  let data: Prisma.AlbumUpdateArgs["data"] = {};

  try {
    if (generateDateAutomatically) {
      const mostRecentCaptureDate = await getMostRecentPhotoDate(name);

      if (!mostRecentCaptureDate) {
        throw new Error(`no photos in ${name} to generate date.`);
      }

      const { captureDate } = mostRecentCaptureDate;

      console.log(
        `👉 changing date automatically from ${prevState.date} to ${captureDate}...`
      );
      data.date = captureDate;
    } else if (date) {
      console.log(
        `👉 changing date manually from ${prevState.date} to ${date}...`
      );
      data.date = new Date(date);
    }

    if (prevState.name !== name) {
      console.log(`👉 changing name from ${prevState.name} to ${name}...`);
      data.name = name;
    }

    let sectionName = "";
    let currentValue = formData.get("section0") as string;
    let currentIndex = 0;

    while (currentValue) {
      sectionName = currentValue;
      currentIndex++;
      currentValue = formData.get(`section${currentIndex}`) as string;
    }

    if (prevState.sectionName !== sectionName) {
      console.log(
        `👉 changing section from "${prevState.sectionName}" to section "${sectionName}"...`
      );
      data.section = { connect: { name: sectionName } };
    }

    if (coverKey && prevState.coverKey !== coverKey) {
      console.log(
        `👉 changing coverKey from ${prevState.coverKey} to ${coverKey}...`
      );
      data.coverPhoto = { connect: { smugMugKey: coverKey } };
    }

    if (prevState.iconId !== iconId) {
      console.log(`👉 updating icon...`);
      data.icon = { connect: { id: iconId } };
    }

    const updatedAlbum = await updateAlbum({
      where: { name },
      data,
    });

    revalidatePath("/admin");

    return {
      ...updatedAlbum,
      date,
      message: `👍 ${name} updated successfully`,
    };
  } catch (error) {
    return {
      message: `👎 ${(error as Error).message}`,
    };
  }
}

export async function deleteAlbum(formData: FormData) {
  const id = parseInt(formData.get("value") as string);
  console.log(formData);

  try {
    const deletedAlbum = await prisma.album.delete({
      where: { id },
    });

    return {
      ...deletedAlbum,
      message: `👍 album deleted successfully.`,
    };
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      message: `👎 ${(error as Error).message}`,
    };
  }
}
