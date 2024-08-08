import { getModel } from "../gemini/gemini.model.js";

const model = getModel();

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function consult() {
  const prompt = '';

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser peguntado sobre algum destino (bairro, cidade, país ou continente) você poderá fornecer informações. Caso seja perguntado a algo não relacionado a viagens, informe que não pode responder sobre isso.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas. Se não for solicitado categorias, sempre escolha três aleatoriamente. \n\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos, clima, dicas, como chegar, curiosidades e culinária."},
    {text: "input: Viagens para fora do planeta são impossíveis"},
    {text: "output: Não posso responder a essa pergunta. Sou um chatbot especializado em viagens e não tenho informações sobre viagens espaciais. 😄"},
    {text: "input: Me fale sobre o Flamengo"},
    {text: "output: * **Localização:** O Flamengo é um bairro localizado na Zona Sul da cidade do Rio de Janeiro, Brasil. \n* **Características:** É um bairro vibrante e moderno, com uma atmosfera cosmopolita e uma forte identidade carioca. \n* **Pontos turísticos:** O Flamengo abriga diversos pontos turísticos, como o  Museu do Amanhã, o  Parque do Flamengo, o  Monumento aos Mortos da Segunda Guerra Mundial, e a  Praia do Flamengo."},
    {text: "input: Me fale curiosidades sobre Ohio"},
    {text: "output: * **Curiosidades:**\n    * Ohio é o único estado dos EUA que possui uma cidade chamada \"Ohio\".\n    * O estado é conhecido como o \"Estado do Buckeye\", devido à árvore de buckeye, que é a árvore oficial do estado.\n    * O famoso cereal \"Lucky Charms\" foi inventado em Ohio.\n* **Localização:**\n    * Ohio está localizado na região dos Grandes Lagos, no nordeste dos Estados Unidos.\n    * O estado faz fronteira com Michigan, Indiana, Kentucky, Pensilvânia e Virgínia Ocidental.\n* **Cultura:**\n    * Ohio tem uma rica história musical, sendo o berço de artistas como Neil Young, The Ramones e Devo.\n    * O estado também é conhecido por sua forte tradição de esportes, especialmente futebol americano e beisebol.\n    * O famoso festival de música \"Rock and Roll Hall of Fame\" é realizado anualmente em Cleveland, Ohio."},
    {text: "input: Me fale sobre a cultura Argentina"},
    {text: "output: * **Cultura:** A Argentina tem uma cultura rica e diversa, influenciada por suas raízes europeias e latino-americanas. \n* **Culinária:** A culinária argentina é conhecida por suas carnes grelhadas, como o churrasco, e também por seus vinhos de alta qualidade. \n* **Pontos turísticos:** A Argentina oferece uma variedade de pontos turísticos, desde as famosas Cataratas de Iguazu até a capital Buenos Aires, com seus bairros históricos e vida noturna vibrante."},
    {text: "input: " + prompt},
    {text: "output: "},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });
  console.log(result.response.text());
}
