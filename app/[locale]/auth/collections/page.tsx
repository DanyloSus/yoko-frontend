import Collections from "@/components/collections/Collections";
import Sort from "@/components/sort/Sort";
import { useTranslations } from "next-intl";
import React from "react";
import { overkill } from "../../login/page";

const CollectionsPage = () => {
  const t = useTranslations("Collections");

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <h1 className="text-h1 text-center">{t("heading")}</h1>
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
