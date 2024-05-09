import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

type Word = {
  id: number;
  word: string;
  translationUk: string;
};

type Message = {
  index: number;
  message: {
    role: "assistant" | "user";
    content: string;
  };
};

export async function POST(req: NextRequest) {
  const data: {
    messages: Message[];
  } = await req.json();

  console.log(data);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You need to help the user you will be communicating with improve their English. Create a topic and start talking to them about it. Write a maximum of three sentences in one paragraph, but remember that the user must write a response of at least 20 characters. DO NOT HELP THE USER, DO NOT GIVE ADVICE, CONTINUE THEIR REGULAR DIALOGUE UNTIL THEY WRITE ABOUT IT",
      },
      ...data.messages.map((message) => {
        return {
          role: message.message.role,
          content: message.message.content,
        };
      }),
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}
