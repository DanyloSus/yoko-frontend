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
    words: Word[];
    messages?: Message[];
  } = await req.json();

  const words = data.words.map((word) => word.word);

  if (data.messages) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You need to help the user you will be communicating with learn these words [${words.join(
            ", "
          )}]. Create a topic and start talking to them about it. Write a maximum of three sentences and only one paragraph, but remember that the user must write a response that is at least 20 characters long. AFTER YOUR FIFTH MESSAGE, BE SURE TO WRITE DOWN WHAT MISTAKES THE USER MADE WHEN WRITING AND GIVE ADVICE`,
        },
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

    return NextResponse.json(
      { message: completion.choices[0] },
      { status: 200 }
    );
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You need to help the user you will be communicating with learn these words [${words.join(
          ", "
        )}]. Create a topic and start talking to them about it. Write a maximum of three sentences and only one paragraph, but remember that the user must write a response that is at least 20 characters long. AFTER YOUR FIFTH MESSAGE, BE SURE TO WRITE DOWN WHAT MISTAKES THE USER MADE WHEN WRITING AND GIVE ADVICE`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}
