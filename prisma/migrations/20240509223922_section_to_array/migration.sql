/*
  Warnings:

  - The `section` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "section",
ADD COLUMN     "section" TEXT[];
