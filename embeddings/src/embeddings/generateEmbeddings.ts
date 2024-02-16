import { type GenerateEmbeddings } from "wasp/server/operations";
import fs from 'fs';
import path from 'path';
import { encode } from 'gpt-3-encoder';
import { openai, initPinecone } from './utils.js';
import mammoth from 'mammoth';
import pdfParse from './pdf.mjs';
import type { PineconeRecord } from '@pinecone-database/pinecone';

type FileToEmbed = { title: string; content: string };

type ChunkedFiles = {
  title: string;
  content: string;
  content_length: any;
  content_tokens: number;
}[][];

/**
 * this is the max number of tokens we want to chunk the text into
 * before we create an embedding for it. You can play around with this
 * number to suit your data. suggested size: 80 - 500
 * for more info, see here: https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
 * remember that embeddings are created based on tokens, not words or characters.
 * for more info see here: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
 */
const CHUNK_SIZE = 300;

// Relative to the execution of the server in .waps/out/server
const DOCS_DIR = '../../../src/docs';
const files = fs.readdirSync(DOCS_DIR);

/**
 * splits the file content into an array of chunks based on the CHUNK_SIZE
 */
const chunkContent = (file: FileToEmbed) => {
  const { title, content } = file;

  const contentTokens = encode(content).length;

  let contentChunks = [];

  if (contentTokens > CHUNK_SIZE) {
    /**
     * For cleaner text, we can split on the period (.) character
     * but for less formatted text, we may want to split on the newline (\n) character
     */
    const split = content.split('. ');
    let chunkText = '';

    for (let i = 0; i < split.length; i++) {
      const sentence = split[i];
      const sentenceTokenLength = encode(sentence).length;
      const chunkTextTokenLength = encode(chunkText).length;

      // if the next sentence will put us over the CHUNK_SIZE, push the current chunkText to the array
      if (chunkTextTokenLength + sentenceTokenLength > CHUNK_SIZE) {
        contentChunks.push(chunkText);
        chunkText = '';
      }

      // if the last character is alphanumeric, add a period to the chunkText else add a space
      if (sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
        chunkText += sentence + '. ';
      } else {
        chunkText += sentence + ' ';
      }
    }

    // push the last chunkText to the array
    contentChunks.push(chunkText.trim());
  } else {
    contentChunks.push(content.trim());
  }

  const chunks = contentChunks.map((text, index) => {
    const trimmedText = text.trim();

    const chunk = {
      title: title + '-' + index,
      content: trimmedText,
      content_length: trimmedText.length,
      content_tokens: encode(trimmedText).length,
    };

    return chunk;
  });

  // add chunks that are less than 100 tokens to the previous chunk
  if (chunks.length > 1) {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const prevChunk = chunks[i - 1];

      if (chunk.content_tokens < 100 && prevChunk) {
        prevChunk.content += ' ' + chunk.content;
        prevChunk.content_length += chunk.content_length;
        prevChunk.content_tokens += chunk.content_tokens;
        chunks.splice(i, 1);
        i--;
      }
    }
  }

  return chunks;
};

/**
 * reads the files from the shared/docs directory, parses them into text,
 * and returns an array of chunks
 */
const chunkFiles = async () => {
  const fileContents: FileToEmbed[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(DOCS_DIR, file);

      const fileStats = fs.statSync(filePath);

      if (fileStats.isFile()) {
        let text: string = '';

        if (file.endsWith('.docx')) {
          const result = await mammoth.extractRawText({ path: filePath });
          console.log('DOCX parsing: ', result.messages.length ? result.messages : 'No errors');

          text = result.value;
        } else if (file.endsWith('.pdf')) {
          let dataBuffer = fs.readFileSync(filePath);

          const data = await pdfParse(dataBuffer);
          text = data.text;
        } else if (file.endsWith('.DS_Store')) {
          continue;
        } else {
          // assume it's a text file, such as .txt or .md
          text = fs.readFileSync(filePath, 'utf8');
        }
        // replace newlines with spaces
        const content = text.replace(/(\r\n|\n|\r)/gm, ' ');
        fileContents.push({ title: file, content });
      }
    }
  } catch (error) {
    console.log('Error parsing documents: ', error);
  }

  const contentChunked: ChunkedFiles = fileContents.map((file) => {
    return chunkContent(file);
  });

  // write the chunked text to a file at the root of the project for debugging
  // Note: only use this function in development
  fs.writeFileSync('../../../chunkedTextForEmbeddings.json', JSON.stringify(contentChunked, null, 2));

  return contentChunked;
};

/**
 * run the function on server start for debugging during development.
 * you can comment remove this after you've tested it.
 */
chunkFiles();

export const generateEmbeddings: GenerateEmbeddings<never, string> = async (_args, context) => {
  try {
    const contentChunked = await chunkFiles();

    const vectors: PineconeRecord[] = [];
    const pinecone = await initPinecone();

    /**
     * pinecone requires an "index" to be created before you can upsert embeddings.
     * here we check if the index exists, and if not, we create it using
     * 1536 as the vector dimensions, since that's OpenAI's text-embedding-ada-002 model uses.
     * for more info, see here: https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
     */
    await pinecone.createIndex({
      name: 'embeds-test',
      dimension: 1536,
      metric: "cosine",
    
      // This option tells the client not to throw if the index already exists.
      // It serves as replacement for createIndexIfNotExists
      suppressConflicts: true,
    
      // This option tells the client not to resolve the promise until the
      // index is ready. It replaces waitUntilIndexIsReady.
      waitUntilReady: true,
    });

    const pineconeIndex = pinecone.Index('embeds-test');

    console.log('generateEmbeddings [[ starting... ]] ');
    for (let i = 0; i < contentChunked.length; i++) {
      for (let j = 0; j < contentChunked[i].length; j++) {
        const text = contentChunked[i];
        const { title: chunkTitle, content: chunkContent, content_tokens: tokenAmount } = text[j];
        const splitTitle = chunkTitle.split('-');
        const parentFileTitle = splitTitle.slice(0, splitTitle.length - 1).join('-');
        console.log('chunkTitle->>', chunkTitle);

        const parentFile = await context.entities.ParentFile.upsert({
          where: {
            title: parentFileTitle,
          },
          create: {
            title: parentFileTitle,
          },
          update: {},
        });

        const existingEmbedding = await context.entities.TextChunk.findFirst({
          where: {
            title: chunkTitle,
          },
        });

        if (!!existingEmbedding) {
          console.log('skipping this chunk -- embedding already exists in the database');
          continue;
        }

        const embeddingResponse = await openai.createEmbedding({
          model: 'text-embedding-ada-002',
          input: chunkContent,
        });

        const [{ embedding }] = embeddingResponse.data.data;

        const vector: PineconeRecord = {
          id: chunkTitle,
          values: embedding,
          // metadata: {}
        };

        vectors.push(vector);

        const chunkedText = await context.entities.TextChunk.create({
          data: {
            title: chunkTitle,
            content: chunkContent,
            tokenAmount,
            parentFileTitle,
          },
        });
        await context.entities.ParentFile.update({
          where: {
            id: parentFile.id,
          },
          data: {
            textChunks: {
              connect: {
                id: chunkedText.id,
              },
            },
          },
        });
        if (j === contentChunked[i].length - 1) {
          await context.entities.ParentFile.update({
            where: {
              id: parentFile.id,
            },
            data: {
              isComplete: true,
            },
          });
          console.log(parentFile.title + ' embeddings [[ complete ]]');
        }
      }
    }

    if (vectors.length === 0) {
      return 'No new embeddings generated.';
    }

    const namespace = pineconeIndex.namespace('my-first-embedding-namespace');
    await namespace.upsert(vectors);

    return 'TextChunk embeddings generated.';
  } catch (error) {
    console.log('Error generating embeddings: ', error);
    return 'Error generating embeddings.';
  }
};
