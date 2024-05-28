import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function prismaWrapper<Args, Result>(prismaFunction: (args: Args) => Result) {
  return (async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      console.error(` > args = ${JSON.stringify(args)};`)
      throw error;
    }
  });
}