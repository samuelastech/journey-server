import { incorporateDocument, incorporateQuestion, readFiles } from "./gemini-embedding.model.js";
import { functions } from "./gemini.model.js";

class GeminiService {
  #model;
  #chat;
  #docs;

  constructor({ model }) {
    this.#model = model;
  }

  async initChat(callback) {
    const files = await readFiles(['Pacotes_Argentina.txt', 'Pacotes_EUA.txt', 'Politics.txt']);
    this.#docs = await incorporateDocument(files);
    this.#chat = callback.bind(this)(this.#model);
  }

  async chat(userMessage) {
    const doc = await incorporateQuestion(userMessage, this.#docs);
    const prompt = `${userMessage} - para formular a resposta, talvez esse conteúdo ajude: ${doc.text} (use se necessário)`;
    const result = await this.#chat.sendMessage(prompt);
    const response = await result.response;
    const content = response.candidates[0].content;
    const text = content.parts.map(({ text }) => text).join('');
    const functionCall = content.parts[0].functionCall;

    if (functionCall) {
      const { name, args } = functionCall;
      const fnResponse = functions[name](args);
      const newResult = await this.#chat.sendMessage([
        {
          functionResponse: {
            name,
            response: {
              name,
              response: fnResponse,
            },
          }, 
        }
      ]);
      const newResponse = await newResult.response;
      return newResponse.text();
    } else if (text) {
      return text;
    }
  }
}

export { GeminiService };
