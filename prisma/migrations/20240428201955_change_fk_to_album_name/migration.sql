/*
  Warnings:

  - You are about to drop the column `albumId` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_albumId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "albumId",
ADD COLUMN     "albumName" TEXT;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumName_fkey" FOREIGN KEY ("albumName") REFERENCES "Album"("name") ON DELETE SET NULL ON UPDATE CASCADE;
