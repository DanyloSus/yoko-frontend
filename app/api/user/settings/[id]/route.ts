// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to update user
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
  // get authorization
  const authToken = (headers().get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // get data
  const data = await req.json();

  try {
    // send patch to update user and get updated data
    const res = await axios.patch(
      `http://18.212.227.5:8876/api/v1/users/${params.id}`,
      data,
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
