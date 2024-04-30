import { logout } from "@/modules/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await logout();

  return new NextResponse(null, {
    status: 204,
  });
}
