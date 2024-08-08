import { getModel } from "../gemini/gemini.model.js";
import { promises } from 'fs';

const model = getModel();

const processTXT = async () => {
  const data = await promises.readFile('av-italy.txt', 'utf-8');

  const prompt = `
    Analise as opiniões descritas em sequênia e resuma os pontos positivos e negativos citados pelos clientes sobre esses desitnos (se houverem).
    Depois, categorize o percentual de respostas em satisfeito, instatisfeito ou neutros, colocando no seguinte formato por exemplo:
    Satisfeitos: 20% - 20 respostas
    Insatisfeitos: 50% - 50 respostas
    Neutros: 30% - 30 respostas
    Se só tiver um tipo de opinião, categorize mesmo assim.
    O total de respostas deve coincidir com o total de opiniões lidas.
    Opiniões: ${data}
  `;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
};

processTXT();