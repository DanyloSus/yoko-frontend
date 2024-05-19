import { CommentResponse } from "@/modules/types/responses";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get method to get cookies of session
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const data: {
    content: string;
  } = await req.json();

  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const res: CommentResponse = await axios.post(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}/comment`,
    {
      content: data.content,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return session
  return NextResponse.json(res.data, { status: 200 });
}
