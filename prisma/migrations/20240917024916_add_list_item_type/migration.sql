/*
  Warnings:

  - Added the required column `type` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "type" VARCHAR(255) NOT NULL;
