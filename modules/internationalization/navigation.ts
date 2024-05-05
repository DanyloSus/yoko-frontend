// external imports
import { createSharedPathnamesNavigation } from "next-intl/navigation";

// suported locales [en, uk]
export const locales = ["en", "uk"] as const;
export const localePrefix = "always"; // start pathnames with the locale

// export a little changed default values of next js
// for saving locale in change paths and others
// https://next-intl-docs.vercel.app/docs/routing/navigation#apis
// use "Shared pathnames" tab
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

export const overkill = (params: string[], t: any) => {
  let values: any = {};

  params.forEach((param) => {
    values[param.split(".")[1]] = t(param);
  });

  return values;
};
