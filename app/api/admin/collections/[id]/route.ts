// external imports
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { CollectionResponse } from "@/modules/types/responses";

// request to get the collection
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

  // get collection
  const res: CollectionResponse = await axios.get(
    `http://18.212.227.5:8876/api/v1/collections/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return collections
  return NextResponse.json(res.data, { status: 200 });
}

// request to update the collection
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
  const data: {
    status: string;
    name: string;
    text: string;
    translationUk: string;
  } = await req.json();

  try {
    // send patch to update collection
    const res = await axios.patch(
      `http://18.212.227.5:8876/api/v1/collections/${params.id}`,
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
