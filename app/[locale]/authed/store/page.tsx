// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import Sort from "@/components/sort/Sort";
import { Link, overkill } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import StoreContent from "@/components/collections/Store";
import Search from "@/components/collections/Search";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("store.title"),
    descriptions: t("store.description"),
  };
}

const StorePage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const t = useTranslations("Store"); // get page translation

  return (
    <div className="w-full flex flex-col gap-[24px] relative">
      <div className="absolute top-[-20px] right-0">
        <Link href="store/add">
          <StyledButton variant="contained">{t("texts.add")}</StyledButton>
        </Link>
      </div>
      <h1 className="text-h2 sm:text-h1 text-center">{t("heading")}</h1>
      <div className="flex justify-between items-center gap-10">
        <Search />
        <Sort
          texts={overkill(
            ["texts.sort", "texts.views", "texts.likes", "texts.difficult"],
            t
          )}
        />
      </div>
      <StoreContent
        query={searchParams?.query || ""}
        texts={{ null: t("texts.null") }}
      />
    </div>
  );
};

export default StorePage;
