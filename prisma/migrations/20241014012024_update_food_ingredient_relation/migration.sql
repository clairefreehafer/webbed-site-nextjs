/*
  Warnings:

  - You are about to drop the column `foodId` on the `Ingredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foodName` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_foodId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "foodId",
ADD COLUMN     "foodName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodName_fkey" FOREIGN KEY ("foodName") REFERENCES "Food"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
