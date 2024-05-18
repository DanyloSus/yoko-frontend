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

  try {
    const res: AuthentificationResponse = await axios.post(
      "http://18.212.227.5:8876/api/v1/auth/admin-login",
      data
    );

    return NextResponse.json(res.data, {
      status: 200,
    });
  } catch (error: any) {
    if (error.response && error.response!.status === 422) {
      return new NextResponse(undefined, {
        status: error.response!.status,
      });
    } else {
      try {
        // admin login
        const res = await axios.post(
          "http://18.212.227.5:8876/api/v1/auth/login",
          data
        );

        console.log(res);
        return NextResponse.json(res.data, {
          status: 200,
        });
      } catch (error: any) {
        return new NextResponse(undefined, {
          status: error.response!.status,
        });
      }
    }
  }
}
