// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// request to block/unblock the user
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

  try {
    // request to block/unblock the user
    await axios.patch(
      `http://18.212.227.5:8876/api/v1/users/${params.id}/blockOrUnblock`,
      null,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // send nothing
    return NextResponse.json(
      {},
      {
        status: 204,
      }
    );
  } catch (error: any) {
    // send error
    return new NextResponse(undefined, {
      status: error.response!.status,
    });
  }
}
