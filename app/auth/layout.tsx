import Header from "@/components/Header";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header state="signed" />
      <main className="pt-[110px]">{children}</main>
    </>
  );
};

export default AuthLayout;