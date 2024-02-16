import { type TextChunk } from "wasp/entities";
import { type SearchEmbeddings } from "wasp/server/operations";
import { openai, initPinecone } from './utils.js';

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

  const namespace = index.namespace('my-first-embedding-namespace'); // this should be the same namespace that we created in generateEmbeddings.ts
  
  // find the top 3 closest embeddings to the search query
  const queryResponse = await namespace.query({
    vector: embedding,
    topK: resultNum,
    includeValues: false,
    includeMetadata: false,
  });

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
