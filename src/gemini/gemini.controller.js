import express from 'express';
import { GeminiService } from './gemini.service.js';
import { getModel } from './gemini.model.js';

const service = new GeminiService({ model: getModel() });
const router = express.Router();

router.post('/', async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({
      error: 'Erro no corpo da requisição',
    });
  }

  try {
    const chatResponse = await service.chat(message);
    return res.json({ response: chatResponse });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
});

export default router;
