// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { CommentResponse } from "@/modules/types/responses";

// post method to create comment
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
  // get data
  const data: {
    content: string;
  } = await req.json();

  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get new comment
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
