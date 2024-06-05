import { cache } from "react";
import { getSection } from "./prisma/section";
import { Prisma } from "@prisma/client";
import { slugName } from "./albums";

type SectionType =
  | string
  | Partial<Prisma.PromiseReturnType<typeof getSection>>;

export const getAncestorSections = cache(async (section: SectionType) => {
  let currentSection = section;
  const result = [];

  if (typeof currentSection === "string") {
    currentSection = await getSection(currentSection);
  }

  while (currentSection?.name) {
    result.unshift(slugName(currentSection.name));

    if (currentSection.parent) {
      currentSection = currentSection.parent;
    } else if (currentSection.parentName) {
      currentSection = await getSection(currentSection.parentName);
    } else {
      break;
    }
  }
  return result;
});

export const getRootSection = cache(async (section: SectionType) => {
  let currentSection = section;
  let result = "";

  if (typeof currentSection === "string") {
    currentSection = await getSection(currentSection);
  }

  while (currentSection?.name) {
    result = currentSection.name;

    if (currentSection.parent) {
      currentSection = currentSection.parent;
    } else if (currentSection.parentName) {
      currentSection = await getSection(currentSection.parentName);
    } else {
      break;
    }
  }
  return result;
});

export const getRootSectionRecursive = cache(async (section: SectionType) => {
  if (typeof section === "string") {
    section = await getSection(section);
  }

  if (section.parent) {
    getRootSectionRecursive(section.parent);
  } else if (section.parentName) {
    getRootSectionRecursive(section.parentName);
  } else {
    return section.name;
  }
});
