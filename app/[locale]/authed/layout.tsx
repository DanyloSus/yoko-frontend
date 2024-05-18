// external imports
import { ReactNode } from "react";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const AuthLayout = ({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) => {
  return (
    <>
      <TranslatedHeader locale={params.locale} />
      <main className="pt-[110px] px-phone md:px-tablet lg:px-pc dark:bg-black dark:text-white min-h-screen">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
