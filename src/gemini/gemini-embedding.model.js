import { TaskType } from "@google/generative-ai";
import { promises as fs } from "fs";
import { getModel } from "./gemini.model.js";
import { GeminiEnum } from "./gemini.enum.js";

const embeddingModel = getModel(GeminiEnum["Embedding-001"]);

async function embedRetrievalQuery(queryText) {
  const result = await embeddingModel.embedContent({
    content: { parts: [{ text: queryText }] },
    taskType: TaskType.RETRIEVAL_QUERY,
  });
  const embedding = result.embedding;
  return embedding.values;
}

/**
 * WARN: Embed contents is expensive, it has a price. It's better to save once the
 * docs vectors in a vectorial database and then consult the euclidian distance from there
 */
export async function incorporateDocument(docTexts) {
  const result = await embeddingModel.batchEmbedContents({
    requests: docTexts.map((t) => ({
      content: { parts: [{ text: t }] },
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    })),
  });
  const embeddings = result.embeddings;
  return embeddings.map((e, i) => ({ text: docTexts[i], values: e.values }));
}


export async function readFiles(files) {
    try {
        const documents = [];
        for (const filePath of files) {
            const document = await fs.readFile(filePath, 'utf-8');
            documents.push(document);
        }
        return documents;
    } catch (error) {
        console.error('Erro ao ler os documentos', error);
        return [];
    }
}

function euclideanDistance(a, b) {
  let sum = 0;
  for (let n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2);
  }
  return Math.sqrt(sum);
}


export async function incorporateQuestion(queryText, docs) {
  const queryValues = await embedRetrievalQuery(queryText);

  let bestDoc = {}
  let minDistance = 1.0
  
  for (const doc of docs) {
    let distance = euclideanDistance(doc.values, queryValues)
    if (distance < minDistance) {
        minDistance = distance
        bestDoc = doc
    }
  }
  return bestDoc
}