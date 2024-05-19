// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { TextExerciseResponse } from "@/modules/types/responses";

// get method to get collection's text exercise
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

  // get texts
  const res: TextExerciseResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}/text`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return texts
  return NextResponse.json(res.data, { status: 200 });
}
