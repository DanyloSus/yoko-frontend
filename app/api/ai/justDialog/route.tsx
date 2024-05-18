// external imports
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// internal imports
import { Message } from "@/modules/types/elements";

// create openAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: NextRequest) {
  // get user's message from request
  const data: {
    messages: Message[];
  } = await req.json();

  // get answer from ChatGPT
  const completion = await openai.chat.completions.create({
    messages: [
      {
        // base rules for ChatGPT
        role: "system",
        content:
          "You need to help the user you will be communicating with improve their English. Create a topic and start talking to them about it. Write a maximum of three sentences in one paragraph, but remember that the user must write a response of at least 20 characters. DO NOT HELP THE USER, DO NOT GIVE ADVICE, CONTINUE THEIR REGULAR DIALOGUE UNTIL THEY WRITE ABOUT IT",
      },
      // messages for story saving
      ...data.messages.map((message) => {
        return {
          role: message.message.role,
          content: message.message.content,
        };
      }),
    ],
    model: "gpt-3.5-turbo",
  });

  // return ChatGPT answer
  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}
