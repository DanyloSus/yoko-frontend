// external imports
import { WordResponse } from "@/modules/types/responses";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to get the word
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get word
  const res: WordResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/words/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return word
  return NextResponse.json(res.data, { status: 200 });
}

// request to update the word
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get data
  const data: {
    word: string;
    translationUk: string;
  } = await req.json();

  try {
    // send patch to update word
    const res = await axios.patch(
      `http://18.212.227.5:8876/api/v1/words/${params.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // send it
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error: any) {
    // send error
    return new NextResponse(undefined, {
      status: error.response!.status,
    });
  }
}
