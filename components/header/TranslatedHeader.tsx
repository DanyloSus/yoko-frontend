// external imports
import React from "react";
import { useTranslations } from "next-intl";

// internal imports
import Header from "./Header";
import { overkill } from "@/modules/internationalization/navigation";

const TranslatedHeader = ({ locale }: { locale: string }) => {
  const t = useTranslations("Header"); // get header translation

  return (
    <Header
      locale={locale}
      texts={overkill(
        [
          "texts.logo",
          "texts.logoAdmin",
          "texts.store",
          "texts.collections",
          "texts.login",
          "texts.register",
        ],
        t
      )}
    />
  );
};

export default TranslatedHeader;
