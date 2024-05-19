// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// patch method to like collection
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

  // send request
  await axios.patch(
    `http://18.212.227.5:8876/api/v1/users/like/${params.id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return session
  return NextResponse.json({}, { status: 200 });
}
