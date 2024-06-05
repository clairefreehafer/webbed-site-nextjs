import { Prisma } from "@prisma/client";
import { cache } from "react";
import { prisma, prismaWrapper } from "./index";

export const getParentSections = cache(async () =>
  prismaWrapper(prisma.section.findMany)({
    select: {
      id: true,
      name: true,
    },
  }),
);

export const getParentSectionOptions = cache(async () => {
  const sections = await prismaWrapper(prisma.section.findMany)({
    select: {
      id: true,
      name: true,
    },
  });

  return ["(none)", ...sections.map(({ name }) => name)];
});

export const getSectionsForHierarchy = cache(async () =>
  prismaWrapper(prisma.section.findMany)({
    select: {
      name: true,
      parentName: true,
    },
  }),
);

export const getSections = cache(async () =>
  prismaWrapper(prisma.section.findMany)({
    include: { parent: true, icon: true, children: true, albums: true },
    orderBy: [
      { parentName: { sort: "desc" } },
      { children: { _count: "desc" } },
    ],
  }),
);

export const getChildSections = cache(async (parentName: string) =>
  prismaWrapper(prisma.section.findMany)({
    where: { parentName },
    select: { name: true },
  }),
);

export const getSection = cache(async (name: string) =>
  prismaWrapper(prisma.section.findUniqueOrThrow)({
    where: { name },
    select: {
      id: true,
      name: true,
      parentName: true,
      parent: {
        select: {
          name: true,
          parentName: true,
        },
      },
    },
  }),
);

export const getAllDescendants = cache(async (sectionName: string) => {
  const sections = await prismaWrapper(prisma.section.findMany)({
    select: {
      name: true,
      parentName: true,
    },
  });

  let descendants: string[] = [];

  function getDescendants(sectionName: string) {
    let isParent = false;

    // check if section is anyone's parent
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].parentName === sectionName) {
        isParent = true;
        break;
      }
    }

    // if the section is not a parent, return
    if (!isParent) {
      return;
    } else {
      // find the child sections
      const intermediateSections = sections
        .map(({ parentName, name }) => {
          if (parentName === sectionName) {
            return name;
          }
        })
        .filter((el) => !!el) as string[];

      descendants = [...descendants, ...intermediateSections];

      intermediateSections.forEach((item) => getDescendants(item));
    }

    descendants = Array.from(new Set(descendants));
  }

  getDescendants(sectionName);

  return descendants;
});

export const createSection = async (args: Prisma.SectionCreateArgs) =>
  prismaWrapper(prisma.section.create)(args);

export const updateSection = async (data: Prisma.SectionUpdateArgs) =>
  prismaWrapper(prisma.section.update)(data);

export const deleteSection = async (id: number) =>
  prismaWrapper(prisma.section.delete)({
    where: { id },
  });
