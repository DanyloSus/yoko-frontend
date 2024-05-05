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
      <main className="pt-[110px] px-pc">{children}</main>
    </>
  );
};

export default AuthLayout;
