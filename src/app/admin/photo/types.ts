import { Prisma } from "@prisma/client";

export type CreatePhotoFormState = Prisma.PhotoCreateInput & { message?: string; };