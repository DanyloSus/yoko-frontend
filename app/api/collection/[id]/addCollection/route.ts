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
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  await axios.post(
    `http://18.212.227.5:8876/api/v1/users/startCollection/${params.id}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return session
  return NextResponse.json({}, { status: 200 });
}
