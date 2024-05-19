import { QuizExerciseResponse } from "@/modules/types/responses";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get method to get cookies of session
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
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  const res: QuizExerciseResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}/quiz`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return session
  return NextResponse.json(res.data, { status: 200 });
}
