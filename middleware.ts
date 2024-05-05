// external imports
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// internal imports
import { updateSession } from "./modules/auth/auth";
import {
  locales,
  localePrefix,
} from "@/modules/internationalization/navigation";

// start before page content
export default async function middleware(request: NextRequest) {
  // update session in cookies
  await updateSession(request);

  return createMiddleware({
    defaultLocale: "en", // Used when no locale matches
    localePrefix, // start pathnames with the locale
    locales, // suported locales [en, uk]
  })(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(uk|en)/:path*"],
};
