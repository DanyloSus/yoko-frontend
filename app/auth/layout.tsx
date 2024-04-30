"use client";

import Header from "@/components/Header";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="pt-[110px] px-pc">{children}</main>
    </>
  );
};

export default AuthLayout;
