import { Prisma } from "@prisma/client";

export type AddAlbumFormState = Prisma.AlbumCreateInput & {
  message?: string
};
