import { openai } from '@ai-sdk/openai';
import { streamText, APICallError } from 'ai';
import { NextResponse } from 'next/server';

// const openaiAccess = new openai()

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = "edge";


export async function POST(req: Request) {
  try {
    const prompt = "Crete a list of three open-ended and enaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an annonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing insetad om universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hooby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the question are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
  
    const result = streamText({
      model: openai('gpt-4o'),
      prompt,
      maxTokens: 400,
    });
  
    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof APICallError) {
        const {name, message}= error
        return NextResponse.json({
            name, message
        },{status: 500})

    }
    else{
        console.error("An unexpected error occured")
        throw error
    }
  }
}