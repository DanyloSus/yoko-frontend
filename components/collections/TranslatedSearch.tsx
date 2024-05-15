import React from "react";
import Search from "./Search";
import { useTranslations } from "next-intl";

const TranslatedSearch = () => {
  const t = useTranslations("Search");

  return <Search text={{ text: t("text") }} />;
};

export default TranslatedSearch;
