/*
  Warnings:

  - You are about to drop the column `parentFileId` on the `TextChunk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `ParentFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TextChunk" DROP CONSTRAINT "TextChunk_parentFileId_fkey";

-- AlterTable
ALTER TABLE "TextChunk" DROP COLUMN "parentFileId",
ADD COLUMN     "parentFileTitle" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ParentFile_title_key" ON "ParentFile"("title");

-- AddForeignKey
ALTER TABLE "TextChunk" ADD CONSTRAINT "TextChunk_parentFileTitle_fkey" FOREIGN KEY ("parentFileTitle") REFERENCES "ParentFile"("title") ON DELETE SET NULL ON UPDATE CASCADE;
