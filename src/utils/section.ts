import { cache } from "react";
import { getSection } from "./prisma/section";

export const getAncestorSections = cache(async (section) => {
  let currentSection = section;
  const result = [];

  while (currentSection) {
    result.unshift(currentSection.name);

    if (currentSection?.parent) {
      currentSection = currentSection.parent;
    } else if (currentSection.parentName) {
      currentSection = await getSection(currentSection.parentName);
    } else {
      break;
    }
  }

  return result;
})