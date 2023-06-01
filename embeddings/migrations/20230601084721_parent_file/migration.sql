/*
  Warnings:

  - You are about to drop the `EmbeddedFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmbeddedFiles";

-- DropTable
DROP TABLE "Text";

-- CreateTable
CREATE TABLE "TextChunk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tokenLength" INTEGER NOT NULL,
    "embeddingId" INTEGER,
    "parentFileId" INTEGER,

    CONSTRAINT "TextChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentFile" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "dateEmbedded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParentFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextChunk" ADD CONSTRAINT "TextChunk_parentFileId_fkey" FOREIGN KEY ("parentFileId") REFERENCES "ParentFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
