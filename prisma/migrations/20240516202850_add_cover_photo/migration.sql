-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "coverKey" TEXT;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_coverKey_fkey" FOREIGN KEY ("coverKey") REFERENCES "Photo"("smugMugKey") ON DELETE SET NULL ON UPDATE CASCADE;
