// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to register user
export async function POST(req: NextRequest) {
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const data = await req.formData();

  console.log(data);

  try {
    // send get to get user's collections
    await axios.post("http://18.212.227.5:8876/api/v1/collections", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    // send it
    return NextResponse.json(undefined, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);

    // send error
    return new NextResponse(undefined, {
      status: error.response!.status,
    });
  }
}
