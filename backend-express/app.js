require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", async (request, response) => {
  const results = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(request.body.plat),
    max_tokens: 2000,
    temperature: 0,
  });
  //   request.body.plat, request.body.nbPersonnes

  response.status(200).json({ result: results.data.choices[0].text });
});

function generatePrompt(plat) {
  return `Donne moi la recette ${plat}`;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
