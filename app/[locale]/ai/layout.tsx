// internal imports
import { ReactNode } from "react";

// external imports
import TranslatedHeader from "@/components/header/TranslatedHeader";

const AILayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  return (
    <>
      <TranslatedHeader locale={params.locale} />
      <div className="pt-[70px] px-phone md:px-tablet lg:px-pc dark:bg-black dark:text-white min-h-screen">
        {children}
      </div>
    </>
  );
};

export default AILayout;
