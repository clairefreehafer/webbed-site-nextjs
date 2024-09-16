/*
  Warnings:

  - Added the required column `name` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "name" VARCHAR(255) NOT NULL;
