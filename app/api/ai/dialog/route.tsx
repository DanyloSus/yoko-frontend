// external imports
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// internal imports
import { Message, Word } from "@/modules/types/elements";

// create openAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: NextRequest) {
  // get user's message and words from request
  const data: {
    words: Word[];
    messages?: Message[];
  } = await req.json();

  // get string from Words
  const words = data.words.map((word) => word.word);

  // if it is not first request from client
  if (data.messages) {
    // get answer from ChatGPT
    const completion = await openai.chat.completions.create({
      messages: [
        {
          // base rules for ChatGPT
          role: "system",
          content: `You need to help the user you will be communicating with learn these words [${words.join(
            ", "
          )}]. Create a topic and start talking to them about it. Write a maximum of three sentences and only one paragraph, but remember that the user must write a response that is at least 20 characters long. AFTER YOUR FIFTH MESSAGE, BE SURE TO WRITE DOWN WHAT MISTAKES THE USER MADE WHEN WRITING AND GIVE ADVICE`,
        },
        // messages for story saving
        ...data.messages.map(
          (message: {
            index: number;
            message: {
              role: "user" | "assistant";
              content: string;
            };
          }) => {
            return {
              role: message.message.role,
              content: message.message.content,
            };
          }
        ),
      ],
      model: "gpt-3.5-turbo",
    });

    // return ChatGPT answer
    return NextResponse.json(
      { message: completion.choices[0] },
      { status: 200 }
    );
  }

  // send request if it is first request which will send
  // question or theme to speak
  const completion = await openai.chat.completions.create({
    messages: [
      {
        // base rules for ChatGPT
        role: "system",
        content: `You need to help the user you will be communicating with learn these words [${words.join(
          ", "
        )}]. Create a topic and start talking to them about it. Write a maximum of three sentences and only one paragraph, but remember that the user must write a response that is at least 20 characters long. AFTER YOUR FIFTH MESSAGE, BE SURE TO WRITE DOWN WHAT MISTAKES THE USER MADE WHEN WRITING AND GIVE ADVICE`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // return ChatGPT answer
  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}
