import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      // {
      //   emit: "event",
      //   level: "query",
      // },
      {
        emit: "stdout",
        level: "error",
      },
      // {
      //   emit: "stdout",
      //   level: "info",
      // },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

export function prismaWrapper<Args, Result>(
  prismaFunction: (args: Args) => Result
) {
  return async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      console.error(` > args = ${JSON.stringify(args)};`);
    }
  };
}
