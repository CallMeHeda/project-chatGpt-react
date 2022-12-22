require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// app.post("/", (req, res) => {
//   openai.completions.create(
//     {
//       model: "text-davinci-003",
//       prompt: req.body.prompt,
//       max_tokens: 2048,
//       temperature: 0.7,
//     },
//     (error, response) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       return res.send(response);
//     }
//   );
// });

app.get("/", async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Dis moi quelle est la capital de la Belgique avec une phrase ?",
    max_tokens: 2000,
    temperature: 0.7,
  });
  res.status(200).json({ result: response.data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
