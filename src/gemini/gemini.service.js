import { functions } from "./gemini.model.js";

class GeminiService {
  #model;
  #chat;

  constructor({ model }) {
    this.#model = model;
  }

  initChat(callback) {
    this.#chat = callback.bind(this)(this.#model);
  }

  async chat(userMessage) {
    const result = await this.#chat.sendMessage(userMessage);
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
