// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to create collection
export async function POST(req: NextRequest) {
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get collection data
  const data = await req.formData();

  try {
    // send post to create collection
    await axios.post("http://18.212.227.5:8876/api/v1/collections", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    // send nothing
    return NextResponse.json(undefined, {
      status: 200,
    });
  } catch (error: any) {
    // send error
    return new NextResponse(undefined, {
      status: error.response!.status,
    });
  }
}
