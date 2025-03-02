const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/test-ai", async (req, res) => {
  const prompt = "Explain how ai works";

  const result = await model.generateContent(prompt);
//   console.log(result.response.text());
  res.send({answer:result.response.text()})
});

app.get("/", (req, res) => {
  res.send({ msg: "lets explore the ai" });
});
app.listen(port, () => {
  console.log("server running", port);
});
