import { useTranslations } from "next-intl";
import Search from "../../ui/Search";

const TranslatedSearch = () => {
  const t = useTranslations("Search");

  return <Search text={{ text: t("text") }} />;
};

export default TranslatedSearch;
