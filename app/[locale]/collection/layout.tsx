// external imports
import React, { ReactNode } from "react";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const CollectionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TranslatedHeader />
      <div id="modal"></div>
      <div className="pt-[70px] dark:bg-black dark:text-white min-h-screen">
        {children}
      </div>
    </>
  );
};

export default CollectionLayout;
