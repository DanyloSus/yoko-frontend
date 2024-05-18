// external imports
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// internal imports
import { locales } from "./navigation";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as "en" | "uk")) notFound();

  return {
    // get messages of the languages
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
