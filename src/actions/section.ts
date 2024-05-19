"use server";

import { Prisma, Section } from "@prisma/client";
import { createSection, deleteSection, updateSection } from "@utils/prisma/section";

export type SectionFormState = Section & { message?: string };

export async function addSection(
  _prevState: Partial<SectionFormState>,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const parent = formData.get("parent") as string;

  try {
    const createdSection = await createSection({
      data: {
        name,
        ...(parent !== "(none)" && { parent: { connect: { name: parent }}})
      }
    });

    return {
      ...createdSection,
      message: `👍 section "${name}" created.`
    }
  } catch (error) {
    let message = `👎 ${(error as Error).message}`;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        message = `👎 a section called "${name}" already exists.`
      }
    }

    return { message };
  }
}

export async function editSection(prevState: Partial<SectionFormState>, formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const parent = formData.get("parent") as string;

  try {
    let data: Prisma.SectionUpdateArgs["data"] = {};

    if (prevState.name !== name) {
      console.log(`👉 changing section name from ${prevState.name} to ${prevState.name}...`);
      data.name = name;
    }

    if (prevState.parentName !== parent) {
      if (parent === "(none)") {
        console.log(`👉 removing ${name} as child of ${prevState.parentName}...`);
        data.parent = { disconnect: true };
      } else if (parent === name) {
        throw new Error("a section cannot be its own parent");
      } else {
        console.log(`👉 updating parent from ${prevState.parentName} to ${parent}...`)
      }
    } 

    const updatedSection = await updateSection({
      where: { id },
      data
    });

    return {
      ...prevState,
      ...updatedSection,
      message: `👍 section "${name}" updated.`
    }
  } catch (error) {
    return { message: `👎 ${(error as Error).message}` };
  }
}

export async function removeSection(formData: FormData) {
  const id = parseInt(formData.get("value") as string);

  try {
    const deletedSection = await deleteSection(id);

    return {
      ...deletedSection,
      message: `👍 album deleted successfully.`
    }
  } catch (error) {
    console.error(`👎 ${error}`);
    return {
      message: `👎 ${(error as Error).message}`
    }
  }
}