import { getSession, login } from "@/modules/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  await login(data);

  return NextResponse.json({ message: "Cookie has created" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const session = await getSession();

  return NextResponse.json({ message: session }, { status: 200 });
}
