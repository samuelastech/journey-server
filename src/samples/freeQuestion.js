import { GeminiEnum } from "../gemini/gemini.enum.js";
import { getModel } from "../gemini/gemini.model.js";

const model = getModel(GeminiEnum["Gemini-1.5-flash"]);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function question() {
  const prompt = 'Cleveland';

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens."},
    {text: "input: me fale o máximo sobre o que puder sobre o destino" + prompt},
    {text: "output: "},
  ];

  const request = {
    contents: [{ role: "user", parts }],
    generationConfig,
  }
  
  const result = await model.generateContent();

  const { totalTokens: inputTotalTokens } = await model.countTokens(request);
  const { totalTokens: outputTotalTokens } = await model.countTokens(result);
   
  console.log(result.response.text());
}
