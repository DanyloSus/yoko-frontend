// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { CollectionsResponse } from "@/modules/types/responses";

// request to get all collections
export async function GET(req: NextRequest) {
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get query params
  const { searchParams } = new URL(req.url);

  try {
    // get collections
    const res: CollectionsResponse = await axios.get(
      `http://18.212.227.5:8876/api/v1/collections${
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
