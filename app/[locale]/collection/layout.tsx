// external imports
import React, { ReactNode } from "react";
import { useTranslations } from "next-intl";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const CollectionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TranslatedHeader />
      <div id="modal"></div>
      <div className="pt-[70px]">{children}</div>
    </>
  );
};

export default CollectionLayout;