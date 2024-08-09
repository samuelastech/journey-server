import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";
import 'dotenv/config';
import { GeminiEnum } from "./gemini.enum.js";

/**
 * @param {string} name 
 * @returns {GenerativeModel}
 */
export const getModel = (name = GeminiEnum["Gemini-1.0-pro"]) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: name, });
};

/**
 * @param {GenerativeModel} model 
 * @returns {ChatSession}
 */
export const startChat = (model) => {
  return model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: `
          Você é um chatbot que representa a empresa Jornada Viagens. Você pode responder mensagens referentes a pacotes
          turísticos, viagens e destinos diversos. Sempre peça o nome e e-mail do cliente antes de começar a responder
          as dúvidas.
        `}],
      },
      {
        role: 'model',
        parts: [{ text: 'Ok, irei começar a fazer isso a partir de agora.' }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    }
  });
};
