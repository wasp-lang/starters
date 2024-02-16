import type { PrismaClient } from '@prisma/client'
import { generateEmbeddings } from "../embeddings/generateEmbeddings";

/**
 * we export this function and define it in our main.wasp config file
 * so that we can run it from the command line with `wasp db seed`
 */
export const embedSeedScript = async (prismaClient: PrismaClient) => {
  await generateEmbeddings(undefined as never, {
    entities: { TextChunk: prismaClient.textChunk, ParentFile: prismaClient.parentFile },
  });
};
