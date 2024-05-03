/*
  Warnings:

  - You are about to drop the column `metadata` on the `Photo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[xmpPath]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "metadata",
ADD COLUMN     "altText" VARCHAR(255),
ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "title" VARCHAR(255),
ADD COLUMN     "xmpPath" VARCHAR(255) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Photo_xmpPath_key" ON "Photo"("xmpPath");
