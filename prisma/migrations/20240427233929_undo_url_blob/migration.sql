/*
  Warnings:

  - You are about to alter the column `url` on the `Photo` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `VarChar(255)`.
  - A unique constraint covering the columns `[url]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "url" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_url_key" ON "Photo"("url");
