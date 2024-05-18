// external imports
import { useTranslations } from "next-intl";

// internal imports
import { overkill } from "@/modules/internationalization/navigation";
import Header from "./Header";

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
          "texts.ai",
          "texts.umAdmin",
          "texts.umTheme",
          "texts.umThemeDark",
          "texts.umThemeLight",
          "texts.umThemeSystem",
          "texts.umLang",
          "texts.umLangUk",
          "texts.umLangEn",
          "texts.umSettings",
          "texts.umLogout",
          "texts.mmAdmUsers",
          "texts.mmAdmCollections",
          "texts.mmAdmWords",
          "texts.mmAdmRequests",
          "texts.mmUserStore",
          "texts.mmUserCollections",
          "texts.mmUserTheme",
          "texts.mmUserThemeDark",
          "texts.mmUserThemeLight",
          "texts.mmUserLang",
          "texts.mmUserLangUk",
          "texts.mmUserLangEn",
          "texts.mmExit",
        ],
        t
      )}
    />
  );
};

export default TranslatedHeader;
