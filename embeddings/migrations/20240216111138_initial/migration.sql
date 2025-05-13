-- CreateTable
CREATE TABLE "TextChunk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tokenAmount" INTEGER NOT NULL,
    "parentFileTitle" TEXT,

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

-- CreateIndex
CREATE UNIQUE INDEX "ParentFile_title_key" ON "ParentFile"("title");

-- AddForeignKey
ALTER TABLE "TextChunk" ADD CONSTRAINT "TextChunk_parentFileTitle_fkey" FOREIGN KEY ("parentFileTitle") REFERENCES "ParentFile"("title") ON DELETE SET NULL ON UPDATE CASCADE;
