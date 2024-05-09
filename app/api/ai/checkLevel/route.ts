import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export async function GET(req: NextRequest) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You need to find out the English level of the person you are going to communicate with in five messages by asking some general questions, then output their level (at the end, output only: A1,A2,B1,B2,C1,C2)",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // return session
  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  //   console.log(data);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You need to find out the English level of the person you are going to communicate with in five messages by asking some general questions, then output their level (at the end, output only: A1,A2,B1,B2,C1,C2)",
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

  return NextResponse.json({ message: completion.choices[0] }, { status: 200 });
}
