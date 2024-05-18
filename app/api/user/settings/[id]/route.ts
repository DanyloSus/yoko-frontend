// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to register user
export async function PATCH(
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

  const data = await req.json();

  console.log(data);
  try {
    // send get to get user's collections
    const res = await axios.patch(
      `http://18.212.227.5:8876/api/v1/users/${params.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log(res.data);

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