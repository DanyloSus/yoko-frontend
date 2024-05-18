// external imports
import { AuthentificationResponse } from "@/modules/types/responses";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// request to delete token from cookies
export async function POST(req: NextRequest) {
  const data: {
    email: string;
    password: string;
  } = await req.json();

  const res: AuthentificationResponse = await axios.post(
    "http://18.212.227.5:8876/api/v1/auth/login",
    data
  );

  // return no content
  return NextResponse.json(res.data, {
    status: 200,
  });
}
