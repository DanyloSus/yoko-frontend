// external imports
import createNextIntlPlugin from "next-intl/plugin";

// internationalization
const withNextIntl = createNextIntlPlugin(
  "./modules/internationalization/i18n.ts" // custom path to i18n.ts
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
