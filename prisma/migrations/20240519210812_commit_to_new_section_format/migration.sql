/*
  Warnings:

  - You are about to drop the column `section` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `sectionTestName` on the `Album` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_sectionTestName_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "section",
DROP COLUMN "sectionTestName",
ADD COLUMN     "sectionName" TEXT;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_sectionName_fkey" FOREIGN KEY ("sectionName") REFERENCES "Section"("name") ON DELETE SET NULL ON UPDATE CASCADE;
