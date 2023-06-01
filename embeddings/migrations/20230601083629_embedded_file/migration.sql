-- CreateTable
CREATE TABLE "EmbeddedFiles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dateEmbedded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmbeddedFiles_pkey" PRIMARY KEY ("id")
);
