// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import Collections from "@/components/collections/Collections";
import Sort from "@/components/sort/Sort";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("collections.title"),
    descriptions: t("collections.description"),
  };
}
const CollectionsPage = () => {
  const t = useTranslations("Collections"); // get page translation

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <h1 className="text-h2 sm:text-h1 text-center">{t("heading")}</h1>
      <Sort
        texts={overkill(
          ["texts.sort", "texts.views", "texts.likes", "texts.difficult"],
          t
        )}
      />
      <Collections texts={{ null: t("texts.null") }} />
    </div>
  );
};

export default CollectionsPage;
