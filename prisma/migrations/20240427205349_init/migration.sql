-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "smugMugKey" VARCHAR(255),
    "url" VARCHAR(255),
    "captureDate" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PhotoToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_smugMugKey_key" ON "Photo"("smugMugKey");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_url_key" ON "Photo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToTag_AB_unique" ON "_PhotoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToTag_B_index" ON "_PhotoToTag"("B");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToTag" ADD CONSTRAINT "_PhotoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToTag" ADD CONSTRAINT "_PhotoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
