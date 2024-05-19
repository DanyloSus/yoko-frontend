// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// post method to add collection to user
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
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // send request
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
