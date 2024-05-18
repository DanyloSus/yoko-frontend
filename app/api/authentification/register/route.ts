// external imports
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { AuthentificationResponse } from "@/modules/types/responses";

// internal imports

// request to register user
export async function POST(req: NextRequest) {
  // get data from request
  const data: {
    name: string;
    surname: string;
    email: string;
    password: string;
  } = await req.json();

  try {
    // send post request to create user
    const res: AuthentificationResponse = await axios.post(
      "http://18.212.227.5:8876/api/v1/auth/register",
      data
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
