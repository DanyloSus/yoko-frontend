// external imports
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { AuthentificationResponse } from "@/modules/types/responses";

// request to log in user
export async function POST(req: NextRequest) {
  // get data from request
  const data: {
    email: string;
    password: string;
  } = await req.json();

  try {
    // get admins data
    const res: AuthentificationResponse = await axios.post(
      "http://18.212.227.5:8876/api/v1/auth/admin-login",
      data
    );

    // send it
    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error: any) {
    // if error because of not correct credentials, then
    // write it
    if (error.response && error.response!.status === 422) {
      return new NextResponse(undefined, {
        status: error.response!.status,
      });
    } else {
      try {
        // user login
        const res = await axios.post(
          "http://18.212.227.5:8876/api/v1/auth/login",
          data
        );

        // send user's data
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
  }
}
