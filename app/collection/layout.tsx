import Header from "@/components/Header";
import React, { ReactNode } from "react";

const CollectionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div id="modal"></div>
      <div className="pt-[70px]">{children}</div>
    </>
  );
};

export default CollectionLayout;
