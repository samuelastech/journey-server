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
    return response.text();
  }
}

export { GeminiService };
