/*
  Warnings:

  - Made the column `sectionName` on table `Album` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_sectionName_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "sectionName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_sectionName_fkey" FOREIGN KEY ("sectionName") REFERENCES "Section"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
