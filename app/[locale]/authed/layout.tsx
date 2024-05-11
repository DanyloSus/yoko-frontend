// external imports
import React from "react";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <TranslatedHeader />
      <main className="pt-[110px] px-phone md:px-tablet lg:px-pc dark:bg-black dark:text-white min-h-screen">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
