-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_name_fkey";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "parentName" TEXT;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_parentName_fkey" FOREIGN KEY ("parentName") REFERENCES "Section"("name") ON DELETE SET NULL ON UPDATE CASCADE;
