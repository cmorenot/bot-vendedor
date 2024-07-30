import OpenAI from "openai";
import  {ChatCompletionMessageParam}  from "openai/resources";
import { generatePrompt, generatePromptDeterminateFlow, generatePromptOrderFlow, generatePromptConfirmFlow } from "./prompt";

const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '#',
  });


/**
 * 
 * @param name 
 * @param history 
 */

const run = async (name: string, history:ChatCompletionMessageParam[]):Promise<string> =>{


      const prompt = generatePrompt(name)
      // console.log('[PROMPT]:', prompt)

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": generatePrompt(name)
          },
          ...history
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return response.choices[0].message.content
}


const runDeterminate = async (history:ChatCompletionMessageParam[]):Promise<string> =>{


  const prompt = generatePromptDeterminateFlow()
  console.log('[PROMPT]:', prompt)

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": prompt
      },
      ...history
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content
}


const runDeterminateJSON = async (history:ChatCompletionMessageParam[]):Promise<string> =>{


  const prompt = generatePromptOrderFlow()

  console.log('[PROMPT]:', prompt)


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": prompt
      },
      ...history
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content
}


const runGenerateConfirmFlow = async (name: string):Promise<string> =>{


  const prompt = generatePromptConfirmFlow(name)

  console.log('[PROMPT----]:', prompt)
  

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": prompt
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content
}

export {run, runDeterminate, runDeterminateJSON, runGenerateConfirmFlow}