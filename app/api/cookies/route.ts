// external imports
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { getSession, login } from "@/modules/auth/auth";

// post method to create cookies of session
export async function POST(req: NextRequest) {
  // get data from request
  const data = await req.json();

  // write session to cookies
  await login(data);

  return NextResponse.json({ message: "Cookie has created" }, { status: 200 });
}

// get method to get cookies of session
export async function GET(req: NextRequest) {
  const session = await getSession();

  // return session
  return NextResponse.json({ message: session }, { status: 200 });
}
