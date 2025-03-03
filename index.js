const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { default: axios } = require("axios");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.get('/generate-detail', async(req,res) => {
  const prompt = req.query?.prompt
  const response = await axios.get(prompt,{responseType:"arraybuffer"})
  const responseData= {
    inlineData:{
      data:Buffer.from(response.data).toString("base64"),
      mimeType:"image/png"
    },
  }
  const result = await model.generateContent([
    "tell the detail of the image",
    responseData
  ])
  console.log(response.data);
  res.send({detail:result.response.text()})
})




app.get("/generate-json", async (req, res) => {
  const prompt = req.query?.prompt;
  const Finalprompt = `
    generate some data for this prompt ${prompt} using this  a JSON schema:
  data:{'datatype':output}
  Return:Array<Recipe>
  `;
  const result = await model.generateContent(Finalprompt);
  // console.log(result.response.text());
  const output = result.response.text().slice(7, -4);
  const jsonData = JSON.parse(output);
  res.send(jsonData);
});

app.get("/test-ai", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    res.send({ message: "please provide a prompt" });
  }

  const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  res.send({ answer: result.response.text() });
});

app.get("/", (req, res) => {
  res.send({ msg: "lets explore the ai" });
});
app.listen(port, () => {
  console.log("server running", port);
});
