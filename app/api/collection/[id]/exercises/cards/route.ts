// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { CardExerciseResponse } from "@/modules/types/responses";

// get method to get collection's card exercise
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

  // get cards
  const res: CardExerciseResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}/flashCards`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return cards
  return NextResponse.json(res.data, { status: 200 });
}
