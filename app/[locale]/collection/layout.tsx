// external imports
import React, { ReactNode } from "react";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const CollectionLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  return (
    <>
      <TranslatedHeader locale={params.locale} />
      <div id="modal"></div>
      <div className="pt-[70px] dark:bg-black dark:text-white min-h-screen">
        {children}
      </div>
    </>
  );
};

export default CollectionLayout;
