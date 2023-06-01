import { openai } from './utils.js';
import { initPinecone } from './utils.js';
import type { TextChunk } from '@wasp/entities';
import type { SearchEmbeddings } from '@wasp/queries/types';

type QueryArgs = { inputQuery: string, resultNum: number };

export const searchEmbeddings: SearchEmbeddings<QueryArgs, TextChunk[]> = async ({ inputQuery, resultNum }, context) => {
  const pinecone = await initPinecone();

  const res = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: inputQuery.trim(),
  });

  // get the embedding of the search query
  const embedding = res.data.data[0].embedding;

  const indexes = await pinecone.listIndexes();
  console.log('indexes-->>', indexes);
  const index = pinecone.Index('embeds-test');

  // find the top 3 closest embeddings to the search query
  const queryRequest = {
    vector: embedding,
    topK: resultNum,
    includeValues: false,
    includeMetadata: false,
  };
  const queryResponse = await index.query({ queryRequest });

  // query the db for the text chunks that match the closest embeddings and return them
  let matches: TextChunk[] = [];
  if (queryResponse.matches?.length) {
    const textChunks = await Promise.all(
      queryResponse.matches.map(async (match) => {
        return await context.entities.TextChunk.findFirst({
          where: {
            title: match.id,
          },
        });
      })
    );
    matches = textChunks.filter((textChunk) => !!textChunk) as TextChunk[];
  }
  return matches;
};
