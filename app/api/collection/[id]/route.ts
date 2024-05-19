// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { CollectionResponse } from "@/modules/types/responses";

// get collection's data
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
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get collection's data
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
