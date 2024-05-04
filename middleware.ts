import { NextRequest } from "next/server";
import { updateSession } from "./modules/auth/auth";
import createMiddleware from "next-intl/middleware";
import {
  locales,
  localePrefix,
} from "@/modules/internationalization/navigation";

export default async function middleware(request: NextRequest) {
  await updateSession(request);
  return createMiddleware({
    // Used when no locale matches
    defaultLocale: "en",
    localePrefix,
    locales,
  })(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(uk|en)/:path*"],
};
