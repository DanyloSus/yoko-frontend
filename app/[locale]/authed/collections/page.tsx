// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import CollectionContent from "@/components/collections/Collections";
import Sort from "@/components/sort/Sort";
import { overkill } from "@/modules/internationalization/navigation";
import Search from "@/components/collections/Search";
import TranslatedSearch from "@/components/collections/TranslatedSearch";

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
const CollectionsPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const t = useTranslations("Collections"); // get page translation

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <h1 className="text-h3 sm:text-h1 text-center">{t("heading")}</h1>
      <div className="flex justify-between items-center gap-10">
        <TranslatedSearch />
      </div>
      <CollectionContent
        texts={{
          null: t("texts.null"),
          error: t("texts.error"),
          loading: t("texts.loading"),
        }}
        query={searchParams?.query || ""}
      />
    </div>
  );
};

export default CollectionsPage;
