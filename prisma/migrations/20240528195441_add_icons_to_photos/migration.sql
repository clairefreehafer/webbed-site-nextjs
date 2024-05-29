-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "iconId" INTEGER;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
