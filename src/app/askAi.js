"use server"
import Groq from "groq-sdk"
const groq = new Groq({apiKey:process.env.GROQ_API_KEY})
export default async function askAi(message){
    const chatCompletion = await groq.chat.completions.create({
        messages:message,
        model:  'llama3-8b-8192'
    })

    return (chatCompletion.choices[0].message.content);
}