import TranslatedHeader from "@/components/header/TranslatedHeader";
import React, { ReactNode } from "react";

const AILayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TranslatedHeader />
      <div className="pt-[70px] px-phone md:px-tablet lg:px-pc">{children}</div>
    </>
  );
};

export default AILayout;
