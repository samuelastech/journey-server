import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import 'dotenv/config';
import { GeminiEnum } from "./gemini.enum.js";

export const getModel = (name = GeminiEnum["Gemini-1.0-pro"]) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: name, });
};
