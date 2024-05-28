/*
  Warnings:

  - You are about to drop the column `description` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "metadata" JSONB;
