// external imports
import { NextRequest, NextResponse } from "next/server";

// internal imports
import { logout } from "@/modules/auth/auth";

// request to delete token from cookies
export async function POST(req: NextRequest) {
  await logout();

  // return no content
  return new NextResponse(null, {
    status: 204,
  });
}
