/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");
