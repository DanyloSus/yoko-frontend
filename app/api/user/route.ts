import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get method to get cookies of session
export async function GET(req: NextRequest) {
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const { data } = await axios.get("http://18.212.227.5:8876/api/user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  // return session
  return NextResponse.json(data, { status: 200 });
}
