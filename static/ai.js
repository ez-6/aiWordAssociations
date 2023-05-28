//import "./start/addRequire.js";

//import { Configuration, OpenAIApi } from '../node_modules/openai/api.ts'
const { Configuration, OpenAIApi } = require("openai");

//function init(){
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
var openai = new OpenAIApi(configuration);
//}

async function getAiResponse(input) {
  if (!input)
    return null;
    
  const messages = [
    { role: 'system', content: 'you are a helpful mood adjusting bot. Given a certain word or phrase as input, you will return a JSON response consisting of a "words" array with up to 8 words relating to the input, a "colors" array with up to 6 color codes of a color palette based on the given input and a "fontName" property with the name of the Google font most appropriate for the given input' },
    { role: 'user', content: 'horror' },
    { role: 'assistant', content: '{ "words": ["frightening", "scary", "creepy", "spooky", "fearsome", "macabre", "terrifying", "dreadful"], "colors": ["#000000", "#9b0502", "#3e1006", "#f2f2f2", "#f7f7f7" ], "fontName": "Nosifer" }' },
    { role: 'user', content: input }
  ];

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      max_tokens: 100
    });

    if (completion.status === 200 && completion.statusText === 'OK')
      return completion.data.choices[0].message.content
  }
  catch (err) {
    console.error(err.message);
    return null;
  }


}

module.exports = { getAiResponse }

//export { init, getAiResponse } 