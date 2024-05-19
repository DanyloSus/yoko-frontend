// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get method to get user from session
export async function GET(req: NextRequest) {
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get user
  const { data } = await axios.get("http://18.212.227.5:8876/api/user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  // return user
  return NextResponse.json(data, { status: 200 });
}
