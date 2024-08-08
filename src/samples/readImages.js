import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GeminiEnum } from "../gemini/gemini.enum.js";
import { getModel } from "../gemini/gemini.model.js";

const model = getModel(GeminiEnum["Gemini-1.5-flash"]);

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

const uploadResponse = await fileManager.uploadFile("sample.webp", {
  mimeType: "image/webp",
  displayName: "Cristo Redentor",
});

const result = await model.generateContent([
  {
    fileData: {
      mimeType: uploadResponse.file.mimeType,
      fileUri: uploadResponse.file.uri
    }
  },
  { text: "Onde é esse lugar?" },
]);

// Output the generated text to the console
console.log(result.response.text())
