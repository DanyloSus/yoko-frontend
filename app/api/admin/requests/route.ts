// external imports
import { RequestsResponse } from "@/modules/types/responses";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports

// request to register user
export async function GET(req: NextRequest) {
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const { searchParams } = new URL(req.url);

  try {
    // send get to get user's collections
    const res: RequestsResponse = await axios.get(
      `http://18.212.227.5:8876/api/v1/collections/requests${
        searchParams.get("page") ? `?page=${searchParams.get("page")}` : ""
      }${
        searchParams.get("query") ? `&query=${searchParams.get("query")}` : ""
      }`,
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
