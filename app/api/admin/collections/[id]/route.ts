// external imports
import { CollectionResponse } from "@/modules/types/responses";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get method to get cookies of session
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
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const res: CollectionResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return session
  return NextResponse.json(res.data, { status: 200 });
}

// request to register user
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
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const data: {
    status: string;
    name: string;
    text: string;
    translationUk: string;
  } = await req.json();

  try {
    // send get to get user's collections
    const res = await axios.patch(
      `http://18.212.227.5:8876/api/v1/collections/${params.id}`,
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
