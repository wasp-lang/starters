import { type TextChunk } from "wasp/entities";
import { type GetEmbeddedFilenames, type GetEmbeddedTextChunk } from "wasp/server/operations";

export const getEmbeddedFilenames: GetEmbeddedFilenames<never, string[]> = async (_args, context) => {
  const parentFilenames = await context.entities.ParentFile.findMany({
    where: {
      isComplete: true,
    },
    select: {
      title: true,
    },
  });
  return parentFilenames.map((parentFilename) => parentFilename.title);
};

type TextChunkWithParentFile = TextChunk & {
    parentFile: {
        title: string;
        textChunks: TextChunk[];
    } | null;
};
export const getEmbeddedTextChunk: GetEmbeddedTextChunk<string, TextChunkWithParentFile> = async (id, context) => {
  const idNumber = parseInt(id);
  const textChunk = await context.entities.TextChunk.findFirstOrThrow({
    where: {
      id: idNumber,
    },
    include: {
      parentFile: {
        select: {
          title: true,
          textChunks: true,
        },
      },
    },
  });

  return textChunk;
};