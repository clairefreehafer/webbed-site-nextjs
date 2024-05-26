import { cache } from "react";
import { getSection } from "./prisma/section";
import { Section } from "@prisma/client";

export const getAncestorSections = cache(async (section: Partial<Section> & { parent?: Section | null }) => {
  let currentSection = section;
  const result = [];

  while (currentSection?.name) {
    result.unshift(currentSection.name);

    if (currentSection.parent) {
      currentSection = currentSection.parent;
    } else if (currentSection.parentName) {
      currentSection = await getSection(currentSection.parentName);
    } else {
      break;
    }
  }

  return result;
})