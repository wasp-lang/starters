import { Configuration, OpenAIApi } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
export type { PineconeRecord } from '@pinecone-database/pinecone';

export const initPinecone = async () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENV!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};


const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
export const openai = new OpenAIApi(configuration);
