/*
  Warnings:

  - You are about to drop the column `tokenLength` on the `TextChunk` table. All the data in the column will be lost.
  - Added the required column `tokenAmount` to the `TextChunk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextChunk" DROP COLUMN "tokenLength",
ADD COLUMN     "tokenAmount" INTEGER NOT NULL;
