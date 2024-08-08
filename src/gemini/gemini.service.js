class GeminiService {
  #model;

  constructor({ model }) {
    this.#model = model;
  }

  async chat(userMessage) {
    const chat = await this.#model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Você é um chatbot que representa a empresa Jornada Viagens. Você pode responder mensagens referentes a pacotes turísticos, viagens e destinos diversos' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Entendi, estou a disposição para responder dúvidas' }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      }
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  }
}

export { GeminiService };
