const express = require('express')
const app = express()
const port = 5000;
require('dotenv').config()
const bodyParser = require('body-parser');
const { OpenAI } = require("openai");
const cors = require('cors')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(bodyParser.json());
app.use(cors());
app.post('/ask-an-ai', async (req, res) => {
  try {
    const {prompt = ''} = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a text or a string, and your task is to classify its sentiment from 0 to 10, 0 being the most negative and 10 being the most positive"
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const {choices = []} = response
    if (choices.length) {
      return res.json({message: choices[0].message.content})
    }
    return res.json({message: "I refuse to answer"});
  } catch (error) {
    console.log("I got an error", error?.message)
    return res.json({message: "Server error please contact administration"});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})